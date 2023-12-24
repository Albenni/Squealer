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
  const [squealchannel, setSquealChannel] = useState([]);
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

  function handleSqueal(event) {
    event.preventDefault();

    if (wrongfiletype) return;

    if (squealcontent === "" && squealfile === null && squeallocation === null)
      return;

    let idgroup = [];

    // Se è un per utenti allora creo la conversazione se non esiste e faccio il redirect alla sezione messaggi privati
    console.log(squealchannel);
    console.log(squealcontent);

    // Check if every member of the squealchannel array is a username
    const isUsername = squealchannel.every((channel) => {
      return channel.type === "Username";
    });

    console.log(squealchannel);

    if (isUsername && !isPublic) {
      setSquealType("Username");
      console.log(
        "Redirect ai messaggi privati e crea la conversazione se non esiste"
      );

      // Wait for the creation of the conversation and then redirect to the private messages section

      squealchannel.map((channel) => {
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
            // Se ci sono nuove conversazioni, mando una notifica
            setNotifs(true);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      // Da mandare i messaggi privati a tutti i destinatari

      return;
    }

    console.log(idgroup);

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
        console.log(err);
      });

    props.setShowBox(false);
  }

  function createTempGeo() {
    // const squealobj = {
    //   publicSqueal: isPublic,
    //   content: squeallocation,
    //   contentType: contentType,
    // };

    // axiosInstance
    //   .post(
    //     config.endpoint.users +
    //       "/" +
    //       sessionStorage.getItem("userid") +
    //       "/squeals",
    //     squealobj
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     props.setSuccessfullSqueal(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    props.setShowBox(false);
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
          <SquealUser user={user} />

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
                        <Button
                          variant="danger"
                          onClick={() => createTempGeo()}
                        >
                          Crea messsaggio temporizzato
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
            {currentchars}/{user.dailyChar}
          </div>
          <Button
            variant="success"
            onClick={handleSqueal}
            style={{ fontWeight: "bold" }}
            disabled={
              user.dailyChar === 0 ||
              contentType === "" ||
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
