import "../../css/SquealBox.css";
import theme from "../../config/theme";

import { useEffect, useState } from "react";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";

import ChannelSelector from "../ChannelSelector";
import SquealSelector from "./SquealSelector";
import ErrorMessage from "../ErrorMessage";
import SquealUser from "./SquealUser";
import SquealText from "./SquealText";
import SquealImage from "./SquealImage";
import SquealVideo from "./SquealVideo";
import AttachPreview from "./AttachPreview";
import Geolocation from "../posts/Geolocation";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

import { useMediaQuery } from "react-responsive";

function SquealBox(props) {
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
  const [isLink, setIsLink] = useState(false);
  const [isAttachment, setIsAttachment] = useState(false);
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

    getUser();
  }, [axiosInstance]);

  function handleSqueal(event) {
    event.preventDefault();

    if (squealcontent === "" && squealfile === null && squeallocation === null)
      return;

    let idgroup = [];
    if (squealType === "Username")
      console.log(
        "Redirect ai messaggi privati e crea la conversazione se non esiste"
      );
    else if (squealType === "Channel" || squealType === "Keyword") {
      idgroup = squealchannel.map((channel) => channel.id);
    }

    console.log(idgroup);

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
          squealType: squealType,
          group: idgroup,
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
          squealType: squealType,
          group: idgroup,
          content: squeallocation,
          contentType: contentType,
        };
      }
    }

    if (squealfile !== null) {
      if (isPublic) {
        squealobj = {
          publicSqueal: isPublic,
          content: squealfile,
          contentType: contentType,
        };
      } else {
        squealobj = {
          publicSqueal: isPublic,
          squealType: squealType,
          group: idgroup,
          content: squealfile,
          contentType: contentType,
        };
      }
    }

    console.log(squealobj);

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

  // function handleSelectAttachment(event) {
  //   // block the user from changing the attachment type if he has already uploaded a file or link
  //   if (isAttachment) {
  //     alert("You have already uploaded a file or link!");
  //     return (event.target.value = postAttach);
  //   }

  //   // if the user selects the same attachment type, return
  //   if (event.target.value === postAttach) {
  //     return;
  //   }

  //   if (event.target.value === "Geolocation") {
  //     setIsLocation(true);
  //     setPostAttach(event.target.value);
  //     // setSquealLocation();
  //   } else {
  //     setIsLocation(false);
  //     setPostAttach(event.target.value);
  //     // setSquealImage();
  //   }
  // }

  // function handleCustomAttachment(event) {
  //   // if (event.target.files[0].size > 10000000) {
  //   //   alert("File too big!");
  //   //   return;
  //   // }
  //   setWrongFileType(false);

  //   // if the event is not given (e.g. when the user cancels the file selection), return
  //   if (!event.target.files[0]) {
  //     setIsAttachment(false);
  //     setDisableInputText(false);
  //     return;
  //   }

  //   // check if the file is an image or a video
  //   if (
  //     !event.target.files[0].type.includes("image") &&
  //     !event.target.files[0].type.includes("video")
  //   ) {
  //     setWrongFileType(true);
  //     return (event.target.value = null);
  //   }

  //   if (
  //     event.target.files[0].type.includes("image") &&
  //     postAttach !== "Immagine"
  //   ) {
  //     setWrongFileType(true);
  //     return (event.target.value = null);
  //   } else if (
  //     event.target.files[0].type.includes("video") &&
  //     postAttach !== "Video"
  //   ) {
  //     setWrongFileType(true);
  //     return (event.target.value = null);
  //   }

  //   setDisableInputText(true);
  //   setIsAttachment(true);
  //   setSquealFile(event.target.files[0]);
  // }

  // function handleCharacterLimit(event) {
  //   event.preventDefault();

  //   if (currentchars > user.dailyChar) {
  //     event.target.value = event.target.value.substring(0, user.dailyChar);
  //   }

  //   if (squealimage.length > 0) {
  //     // setCurrentChars(event.target.value.length + imagecharsize);
  //   } else {
  //     setCurrentChars(event.target.value.length);
  //   }

  //   // handleImage(event);
  // }

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShowBox(false);
        props.setSuccessfullSqueal(false);
      }}
      onExit={() => {
        setIsAttachment(false);
        setDisableInputText(false);
        setIsLink(false);
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
                    />
                  )}
                  {contentType === "video" && (
                    <SquealVideo
                      squealcontent={squealcontent}
                      setSquealContent={setSquealContent}
                      squealfile={squealfile}
                      setSquealFile={setSquealFile}
                    />
                  )}
                  {contentType === "geolocalization" && (
                    <Geolocation setSquealLocation={setSquealLocation} />
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
            disabled={user.dailyChar === 0 || contentType === ""}
          >
            Squeal
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SquealBox;
