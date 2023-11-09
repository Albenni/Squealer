import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SquealBox.css";
import theme from "../config/theme";

import { useEffect, useState } from "react";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";

import AttachPreview from "./AttachPreview";
import ChannelSelector from "./ChannelSelector";
import ErrorMessage from "./ErrorMessage";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

import { useMediaQuery } from "react-responsive";

function SquealBox(props) {
  const axiosInstance = useAxiosPrivate();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  // User variables
  const [user, setUser] = useState({});

  // Form variables
  const [isPublic, setIsPublic] = useState(true);
  const [squealchannel, setSquealChannel] = useState([]);
  const [postAttach, setPostAttach] = useState("Immagine");

  // Squeal variables
  const [squealtext, setSquealText] = useState("");
  const [squealimage, setSquealImage] = useState("");
  const [squealvideo, setSquealVideo] = useState("");
  const [squealfile, setSquealFile] = useState(null);
  const [squeallocation, setSquealLocation] = useState(null);

  // Control variables
  const [currentchars, setCurrentChars] = useState(0);
  const [islocation, setIsLocation] = useState(false);
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

    props.setShowBox(false);

    if (isPublic) {
      console.log("Squeal pubblico");
    } else {
      console.log("Squeal privato");
      console.log(squealchannel);
    }

    console.log(squealimage);
    console.log(squealvideo);
    console.log(squeallocation);
    console.log(squealtext);

    props.setSuccessfullSqueal(true);

    //post request to send squeal to db and show on the feed
  }

  function handleSelectAttachment(event) {
    // block the user from changing the attachment type if he has already uploaded a file or link
    if (isAttachment) {
      alert("You have already uploaded a file or link!");
      return (event.target.value = postAttach);
    }

    // if the user selects the same attachment type, return
    if (event.target.value === postAttach) {
      return;
    }

    if (event.target.value === "Geolocation") {
      setIsLocation(true);
      setPostAttach(event.target.value);
      // setSquealLocation();
    } else {
      setIsLocation(false);
      setPostAttach(event.target.value);
      // setSquealImage();
    }
  }

  function handleAttachmentLink(event) {
    if (event.target.value.length > 0) {
      setDisableInputText(true);
      setIsLink(true);
    } else {
      setDisableInputText(false);
      setIsLink(false);
    }

    if (islocation) {
      setSquealLocation(event.target.value);
    } else if (postAttach === "Video") {
      setSquealVideo(event.target.value);
    } else {
      setSquealImage(event.target.value);
    }
  }

  function handleCustomAttachment(event) {
    // if (event.target.files[0].size > 10000000) {
    //   alert("File too big!");
    //   return;
    // }
    setWrongFileType(false);

    // if the event is not given (e.g. when the user cancels the file selection), return
    if (!event.target.files[0]) {
      setIsAttachment(false);
      setDisableInputText(false);
      return;
    }

    // check if the file is an image or a video
    if (
      !event.target.files[0].type.includes("image") &&
      !event.target.files[0].type.includes("video")
    ) {
      setWrongFileType(true);
      return (event.target.value = null);
    }

    if (
      event.target.files[0].type.includes("image") &&
      postAttach !== "Immagine"
    ) {
      setWrongFileType(true);
      return (event.target.value = null);
    } else if (
      event.target.files[0].type.includes("video") &&
      postAttach !== "Video"
    ) {
      setWrongFileType(true);
      return (event.target.value = null);
    }

    setDisableInputText(true);
    setIsAttachment(true);
    setSquealFile(event.target.files[0]);
  }

  function handleCharacterLimit(event) {
    event.preventDefault();

    if (currentchars > user.dailyChar) {
      event.target.value = event.target.value.substring(0, user.dailyChar);
    }

    setSquealText(event.target.value);

    if (squealimage.length > 0) {
      // setCurrentChars(event.target.value.length + imagecharsize);
    } else {
      setCurrentChars(event.target.value.length);
    }

    // handleImage(event);
  }

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShowBox(false);
        props.setSuccessfullSqueal(false);
        setIsAttachment(false);
        setDisableInputText(false);
        setIsLink(false);
        setPostAttach("Immagine");
        setSquealText("");
        setSquealImage("");
        setSquealVideo("");
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
          <div className="row container-fluid">
            <div
              className={
                isMobile
                  ? "col-sm-auto pb-3 d-flex justify-content-center"
                  : "col-sm-auto pb-3"
              }
            >
              <img
                alt="Profile"
                src={"https://picsum.photos/100"}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="col">
              <div className={isMobile ? "row d-flex" : "row"}>
                <h5
                  className={
                    isMobile ? "col d-flex justify-content-center" : "col"
                  }
                >
                  {user.firstname} {user.surname}
                </h5>
              </div>
              <div className={isMobile ? "row d-flex" : "row"}>
                <h6
                  style={{ color: theme.colors.lightgrey }}
                  className={
                    isMobile ? "col d-flex justify-content-center" : "col"
                  }
                >
                  @{user.username}
                </h6>
              </div>
            </div>
            {!isMobile && (
              <div
                className="col d-flex align-items-start justify-content-end"
                style={{
                  pointerEvents: "none",
                }}
              >
                <p>Numero caratteri giornalieri: {user.dailyChar}</p>
              </div>
            )}
          </div>

          {isMobile && (
            <div
              className="pt-3 d-flex justify-content-center align-items-center"
              style={{
                pointerEvents: "none",
              }}
            >
              <p>Numero caratteri giornalieri: {user.dailyChar}</p>
            </div>
          )}

          {user.dailyChar === 0 ? (
            <div className={isMobile ? " pt-5 text-center" : "text-center"}>
              <h5>
                Aspetta domani per postare un nuovo squeal, oppure acquista
                caratteri extra!
              </h5>
            </div>
          ) : (
            <>
              <InputGroup
                className={
                  isMobile ? "container-fluid pt-5" : "container-fluid"
                }
              >
                <div className="container-fluid">
                  <ErrorMessage
                    visible={wrongfiletype}
                    error={
                      "Tipo di file non consentito, puoi selezionare solo video e immagini!"
                    }
                  />
                  <ChannelSelector
                    isPublic={isPublic}
                    setIsPublic={setIsPublic}
                    squealchannel={squealchannel}
                    setSquealChannel={setSquealChannel}
                  />
                </div>
                <div className="container-fluid">
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder={"Inserisci URL " + postAttach}
                      aria-label="With textarea"
                      aria-describedby="Attachment"
                      onChange={handleAttachmentLink}
                      disabled={isAttachment}
                    />
                    <div className="col-m-2">
                      <Form.Select
                        aria-label="SelectAttachment"
                        onChange={handleSelectAttachment}
                        style={{
                          backgroundColor: "#e9ecef",
                          textAlign: "center",
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                      >
                        <option value="Immagine">Image</option>
                        <option value="Video">Video</option>
                        <option value="Geolocation">Location</option>
                      </Form.Select>
                    </div>
                  </InputGroup>

                  <Form.Group
                    controlId="formFile"
                    className="mb-3"
                    hidden={islocation}
                  >
                    <Form.Label>oppure</Form.Label>

                    <Form.Control
                      type="file"
                      disabled={isLink}
                      onChange={handleCustomAttachment}
                    />
                  </Form.Group>
                </div>

                <div className="container-fluid">
                  <AttachPreview
                    setSquealLocation={setSquealLocation}
                    iscustom={isAttachment}
                    type={postAttach}
                    image={squealimage}
                    video={squealvideo}
                    location={squeallocation}
                    file={squealfile}
                  />
                </div>

                <div
                  className="container-fluid"
                  disabled={disableinputtext}
                  aria-disabled={disableinputtext}
                >
                  <InputGroup>
                    <InputGroup.Text>Scrivi il tuo squeal</InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      aria-label="Squeal textarea"
                      onChange={handleCharacterLimit}
                    />
                  </InputGroup>
                </div>
              </InputGroup>
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
            disabled={currentchars <= 0 || user.dailyChar === 0}
          >
            Squeal
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SquealBox;
