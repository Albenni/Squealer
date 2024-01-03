import "../../css/SquealBox.css";
import theme from "../../config/theme";

import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import ChannelSelector from "./ChannelSelector";
import SquealSelector from "./SquealSelector";
import ErrorMessage from "../ErrorMessage";
import SquealUser from "./SquealUser";
import SquealText from "./SquealText";
import SquealImage from "./SquealImage";
import SquealVideo from "./SquealVideo";
import AttachPreview from "./AttachPreview";
import Geolocation from "../posts/Geolocation";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

import config from "../../config/config";

import { useMediaQuery } from "react-responsive";

function SquealBox(props) {
  const { setNotifs } = useAuth();

  const axiosInstance = useAxiosPrivate();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  // User variables
  const [user, setUser] = useState({});

  // Form variables
  const [isPublic, setIsPublic] = useState(true);
  const [squealchannel, setSquealChannel] = useState([]); // Array of objects {id, type}, destination of the squeal
  const [contentType, setContentType] = useState(""); // text, image, video, geolocalization
  const [squealType, setSquealType] = useState("Username"); // Channel o Keyword o Username

  // Squeal variables
  const [squealcontent, setSquealContent] = useState("");
  const [squealfile, setSquealFile] = useState(null);
  const [squeallocation, setSquealLocation] = useState(null);

  // Control variables
  const [currentchars, setCurrentChars] = useState(0);
  const [disableinputtext, setDisableInputText] = useState(false);
  const [wrongfiletype, setWrongFileType] = useState(false);
  const [insufficientchars, setInsufficientChars] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axiosInstance.get(
          config.endpoint.users + "/" + sessionStorage.getItem("userid")
        );

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (sessionStorage.getItem("userid") !== "guest") getUser();
  }, [axiosInstance]);

  async function handlePrivateMessages() {
    let convosid = [];

    // Wait for the creation of the conversation and then redirect to the private messages section
    await axiosInstance
      .get(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/conversations"
      )
      .then((res) => {
        console.log(res);
        const conversations = res.data;

        squealchannel.forEach((channel) => {
          const found = conversations.find((conversation) => {
            return (
              conversation.user1._id === channel.id ||
              conversation.user2._id === channel.id
            );
          });
          console.log(channel);
          console.log("Found: ", found);

          if (found)
            convosid.push({
              conversationId: found._id,
              receiverId: channel.id,
            });
          else {
            axiosInstance
              .post(
                config.endpoint.users +
                  "/" +
                  sessionStorage.getItem("userid") +
                  "/conversations",
                {
                  receiverId: channel.id,
                }
              )
              .then((res) => {
                console.log(res);
                convosid.push({
                  receiverId: channel.id,
                  conversationId: res.data.conversationId,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Invio dei messaggi: ");
    console.log(convosid);

    convosid.forEach((conversation) => {
      // Check if the message is a file or a text
      if (contentType === "geolocalization") {
        // Send the squeal with the location
        axiosInstance
          .post(
            config.endpoint.users +
              "/" +
              sessionStorage.getItem("userid") +
              "/conversations/" +
              conversation.conversationId,
            {
              content: squeallocation,
              contentType: "geolocalization",
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        (contentType === "image" || contentType === "video") &&
        squealfile
      ) {
        // Send the squeal with the file
        console.log("Sending file");
        const formData = new FormData();
        formData.append("message", squealfile);
        formData.append("contentType", contentType);
        axiosInstance
          .post(
            config.endpoint.users +
              "/" +
              sessionStorage.getItem("userid") +
              "/conversations/" +
              conversation.conversationId,
            formData
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        contentType === "text" ||
        ((contentType === "image" || contentType === "video") &&
          squealcontent &&
          !squealfile)
      ) {
        axiosInstance
          .post(
            config.endpoint.users +
              "/" +
              sessionStorage.getItem("userid") +
              "/conversations/" +
              conversation.conversationId,
            {
              content: squealcontent,
              contentType: "text",
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    setNotifs(true);
    props.setShowBox(false);
  }

  function handleSqueal(event) {
    event.preventDefault();

    if (wrongfiletype) return;

    if (squealcontent === "" && squealfile === null && squeallocation === null)
      return;

    // Check if every member of the squealchannel array is a username
    const isUsername = squealchannel.every((channel) => {
      return channel.type === "Username";
    });

    console.log(squealchannel);

    // Gestione messaggi privati

    if (isUsername && !isPublic) {
      setSquealType("Username");
      console.log(
        "Redirect ai messaggi privati e crea la conversazione se non esiste"
      );

      handlePrivateMessages();
      return;
    }

    // Gestione squeal

    // Model
    // receivers: [
    //   {
    //     group: {
    //       type: mongoose.SchemaTypes.ObjectId,
    //       refPath: "receivers.groupType",
    //     },
    //     groupType: {
    //       type: String,
    //       enum: ["Channel", "Keyword"],
    //     },
    //   },
    // ]

    const receivers = squealchannel.map((channel) => {
      return {
        group: channel.id,
        groupType: channel.type,
      };
    });

    let squealobj = {};

    if (squealcontent !== "") {
      if (isPublic) {
        squealobj = {
          publicSqueal: isPublic,
          content: squealcontent,
          contentType: contentType,
        };
      } else {
        squealobj = {
          publicSqueal: isPublic,
          receivers: receivers,
          content: squealcontent,
          contentType: contentType,
        };
      }
    }

    if (squeallocation !== null) {
      if (isPublic) {
        squealobj = {
          publicSqueal: isPublic,
          content: squeallocation,
          contentType: contentType,
        };
      } else {
        squealobj = {
          publicSqueal: isPublic,
          receivers: receivers,
          content: squeallocation,
          contentType: contentType,
        };
      }
    }

    if (squealfile !== null) {
      const formData = new FormData();
      if (isPublic) {
        formData.append("publicSqueal", isPublic);
        formData.append("contentType", contentType);
        // squealobj = {
        //   publicSqueal: isPublic,
        //   contentType: contentType,
        // };
      } else {
        formData.append("publicSqueal", isPublic);
        formData.append("receivers", receivers);
        formData.append("contentType", contentType);

        // squealobj = {
        //   publicSqueal: isPublic,
        //   receivers: receivers,
        //   contentType: contentType,
        // };
      }

      formData.append("squeal", squealfile);

      axiosInstance
        .post(
          config.endpoint.users +
            "/" +
            sessionStorage.getItem("userid") +
            "/squeals",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          props.setSuccessfullSqueal(true);
        })
        .catch((err) => {
          if (err.response.status === 406) {
            setInsufficientChars(true);
          } else setInsufficientChars(false);
          console.log(err);
        });
    }

    console.log(squealobj);

    axiosInstance
      .post(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/squeals",
        squealobj
      )
      .then((res) => {
        console.log(res);
        props.setSuccessfullSqueal(true);
      })
      .catch((err) => {
        if (err.response.status === 406) {
          setInsufficientChars(true);
        } else setInsufficientChars(false);
      });

    props.setShowBox(false);
  }

  function createTempGeo() {
    sessionStorage.setItem("tempgeo", true);

    // props.setShowBox(false);
  }

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShowBox(false);
        props.setSuccessfullSqueal(false);
      }}
      onExit={() => {
        setDisableInputText(false);
        setWrongFileType(false);
        setSquealContent("");
        setSquealFile(null);
        setSquealLocation(null);
      }}
      size="lg"
      fullscreen={isMobile}
      backdrop="static"
      centered
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nuovo squeal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <SquealUser user={user} chars={currentchars} />

          {user.dailyChar === 0 ? (
            <div className={isMobile ? " pt-5 text-center" : "text-center"}>
              <h5>
                Aspetta domani per postare un nuovo squeal, oppure acquista
                caratteri extra!
              </h5>
            </div>
          ) : (
            <>
              <div
                className={
                  isMobile ? "container-fluid pt-5" : "container-fluid"
                }
              >
                <div className="container-fluid">
                  <ErrorMessage
                    visible={wrongfiletype}
                    error={"Tipo di file non consentito, riprova!"}
                  />
                  <ChannelSelector
                    isPublic={isPublic}
                    setIsPublic={setIsPublic}
                    squealchannel={squealchannel}
                    setSquealChannel={setSquealChannel}
                    squealType={squealType}
                    setSquealType={setSquealType}
                  />
                </div>

                <div className="container-fluid">
                  <SquealSelector
                    contentType={contentType}
                    setContentType={setContentType}
                  />
                </div>

                <div className="container-fluid">
                  {contentType === "text" && (
                    <SquealText
                      setSquealContent={setSquealContent}
                      disableinputtext={disableinputtext}
                      setCurrentChars={setCurrentChars}
                    />
                  )}
                  {contentType === "image" && (
                    <SquealImage
                      squealcontent={squealcontent}
                      setSquealContent={setSquealContent}
                      squealfile={squealfile}
                      setSquealFile={setSquealFile}
                      setWrongFileType={setWrongFileType}
                    />
                  )}
                  {contentType === "video" && (
                    <SquealVideo
                      squealcontent={squealcontent}
                      setSquealContent={setSquealContent}
                      squealfile={squealfile}
                      setSquealFile={setSquealFile}
                      setWrongFileType={setWrongFileType}
                    />
                  )}
                  {contentType === "geolocalization" && (
                    <>
                      <Geolocation setSquealLocation={setSquealLocation} />
                      <div className="p-3">
                        <Button variant="danger" onClick={createTempGeo}>
                          Crea messaggio temporizzato
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {contentType !== "" && contentType !== "text" && (
                <div className="container-fluid">
                  <AttachPreview
                    squealcontent={squealcontent}
                    squealfile={squealfile}
                    contentType={contentType}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="container-fluid d-flex justify-content-end">
          <div className="d-flex align-items-center px-3">
            <ErrorMessage
              visible={insufficientchars}
              error={"Numero di caratteri non sufficiente!"}
            />
          </div>

          <Button
            variant="success"
            onClick={handleSqueal}
            style={{ fontWeight: "bold" }}
            disabled={
              user.dailyChar === 0 ||
              contentType === "" ||
              user.dailyChar - currentchars < 0 ||
              (!isPublic && squealchannel.length === 0)
            }
          >
            Squeal
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SquealBox;
