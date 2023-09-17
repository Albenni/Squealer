import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SquealBox.css";
import theme from "../config/theme";

import { useState } from "react";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";

import { defaultchars, imagecharsize } from "../config/constants.js";

import AttachPreview from "./AttachPreview";

function SquealBox(props) {
  // Form variables
  const [postChannel, setPostChannel] = useState("Scrivi il tuo destinatario");
  const [postLink, setPostLink] = useState("Link");

  // Squeal variables
  const [squealchannel, setSquealChannel] = useState("");
  const [squealtext, setSquealText] = useState("");
  const [squealimage, setSquealImage] = useState("");
  const [squeallocation, setSquealLocation] = useState("");

  // Control variables
  const [currentchars, setCurrentChars] = useState(0);
  const [islocation, setIsLocation] = useState(false);

  function handleSqueal(event) {
    event.preventDefault();

    console.log(squealtext);
    console.log(squealimage);

    props.setShowBox(false);

    //post request to send squeal to db and show on the feed
  }

  function handleSelectAttachment(event) {
    if (event.target.value === "Geolocation") {
      setIsLocation(true);
      setSquealLocation(event.target.value);
    } else {
      setIsLocation(false);
      setSquealImage(event.target.value);
    }
  }

  function handleAttachment(event) {
    if (squealtext.length + imagecharsize > defaultchars) {
      alert("You have exceeded the character limit!");
      return;
    }

    if (islocation) {
      setSquealLocation(event.target.value);
      return;
    }

    setSquealImage(event.target.value);

    // if (squealimage.length > 0) {
    //   setCurrentChars(squealtext.length + imagecharsize);
    // } else {
    //   setCurrentChars(squealtext.length);
    // }
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
      backdrop="static"
      centered
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nuovo post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row container-fluid">
            <div className="col-sm-auto pb-3">
              <img
                alt="Profile"
                src={"https://picsum.photos/100"}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="col">
              <div className="row">
                <h5 className="col">Username</h5>
              </div>
              <div className="row">
                <h6 style={{ color: theme.colors.lightgrey }} className="col">
                  @Username
                </h6>
              </div>
            </div>
          </div>

          <InputGroup className="mb-3">
            <InputGroup className="mb-3">
              <div className="col-m-2">
                <Form.Select
                  placeholder="Seleziona il canale"
                  aria-label="SelectChannel"
                  onChange={(e) => setPostChannel(e.target.value)}
                  style={{
                    backgroundColor: "#e9ecef",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <option value="Username">@</option>
                  <option value="Channel">§</option>
                  <option value="Hashtag">#</option>
                </Form.Select>
              </div>
              <Form.Control
                placeholder={postChannel}
                aria-label="Channel"
                aria-describedby="Channel"
                autoFocus
                onChange={(e) => setSquealChannel(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder={"Inserisci " + postLink}
                aria-label="With textarea"
                aria-describedby="Attachment"
                onChange={handleAttachment}
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
                  <option value="Link">Image or video</option>
                  <option value="Geolocation">Location</option>
                </Form.Select>
              </div>
            </InputGroup>

            <div className="container-fluid">
              <AttachPreview
                islocation={islocation}
                image={squealimage}
                location={squeallocation}
              />
            </div>

            <InputGroup>
              <InputGroup.Text>Scrivi il tuo squeal</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="Squeal textarea"
                onChange={handleCharacterLimit}
              />
            </InputGroup>
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="container-fluid p-3 d-flex justify-content-end">
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
