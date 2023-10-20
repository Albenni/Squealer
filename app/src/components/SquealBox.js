import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SquealBox.css";
import theme from "../config/theme";

import { useEffect, useState } from "react";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";

import { defaultchars, imagecharsize } from "../config/constants.js";

import AttachPreview from "./AttachPreview";
import ChannelSelector from "./ChannelSelector";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

import { useMediaQuery } from "react-responsive";

function SquealBox(props) {
  const userapi = useAxiosPrivate();
  const endpoint = config.endpoint.users + "/";

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  // User variables
  const [user, setUser] = useState({});

  // Form variables
  const [postChannel, setPostChannel] = useState("Scrivi il tuo destinatario");
  const [postAttach, setPostAttach] = useState("Immagine");

  // Squeal variables
  const [squealchannel, setSquealChannel] = useState([]);
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

  useEffect(() => {
    const userId = sessionStorage.getItem("userid");

    userapi
      .get(endpoint + userId)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userapi]);

  function handleSqueal(event) {
    event.preventDefault();

    props.setShowBox(false);

    console.log(squealchannel);
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
      alert("Wrong file type, only images or video are allowed!");
      return (event.target.value = null);
    }

    if (
      event.target.files[0].type.includes("image") &&
      postAttach !== "Immagine"
    ) {
      alert("Wrong file type, not an image!");
      return (event.target.value = null);
    } else if (
      event.target.files[0].type.includes("video") &&
      postAttach !== "Video"
    ) {
      alert("Wrong file type, not a video!");
      return (event.target.value = null);
    }

    setDisableInputText(true);
    setIsAttachment(true);
    setSquealFile(event.target.files[0]);
  }

  function handleCharacterLimit(event) {
    event.preventDefault();

    if (currentchars > defaultchars) {
      event.target.value = event.target.value.substring(0, defaultchars);
    }

    setSquealText(event.target.value);

    if (squealimage.length > 0) {
      setCurrentChars(event.target.value.length + imagecharsize);
    } else {
      setCurrentChars(event.target.value.length);
    }

    // handleImage(event);
  }

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShowBox(false)}
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
                <p>Numero caratteri disponibili: {user.charAvailable}</p>
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
              <p>Numero caratteri disponibili: {user.charAvailable}</p>
            </div>
          )}
          <InputGroup
            className={isMobile ? "container-fluid pt-5" : "container-fluid"}
          >
            <div className="container-fluid">
              <ChannelSelector
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="container-fluid d-flex justify-content-end">
          <div className="d-flex align-items-center px-3">
            {currentchars}/{defaultchars}
          </div>
          <Button
            variant="success"
            onClick={handleSqueal}
            style={{ fontWeight: "bold" }}
          >
            Squeal
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SquealBox;
