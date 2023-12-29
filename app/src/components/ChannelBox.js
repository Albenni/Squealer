import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import addimage from "../assets/add-image.png";
import ErrorMessage from "./ErrorMessage";
import UserSelector from "./UserSelector";

function ChannelBox({ show, setShowCreate }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [missingfields, setMissingFields] = useState(false);

  // Post content
  const [name, setName] = useState("");
  const [isprivate, setIsPrivate] = useState(false);
  const [description, setDescription] = useState("");
  const [profilepic, setProfilePic] = useState(null);

  // Variables
  const [imagepreview, setImagePreview] = useState(null);
  const [receiverlist, setReceiverList] = useState([]);

  useEffect(() => {
    return () => {
      if (imagepreview) URL.revokeObjectURL(imagepreview);
      setDescription("");
      setName("");
      setProfilePic(null);
      setImagePreview(null);
    };
  }, []);

  function handleProfilePicChange(e) {
    if (e.target.files[0] === undefined) {
      setProfilePic(null);
      setImagePreview(null);
      return;
    }

    const file = e.target.files[0];
    const imgfileRegex = /(image\/(png|jpg|jpeg|gif|svg|bmp|webp|HEIC))/i;

    if (imgfileRegex.test(file.type)) {
      setProfilePic(file);
      setImagePreview(URL.createObjectURL(file));
      console.log(file);
    } else {
      setProfilePic(null);
      console.log("Not file");
    }
  }

  function handleCreate() {
    console.log("Name: " + name);
    console.log("Privato: " + isprivate);
    console.log("Des: " + description);
    console.log("Pic: " + JSON.stringify(profilepic));
    console.log("List: " + JSON.stringify(receiverlist));

    if (
      name === "" ||
      description === "" ||
      profilepic === null ||
      (isprivate && receiverlist.length === 0)
    ) {
      setMissingFields(true);
      return;
    }

    setMissingFields(false);
    setShowCreate(false);
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShowCreate(false);
        // props.setSuccessfullSqueal(false);
      }}
      onExit={() => {
        // setDisableInputText(false);
        // setWrongFileType(false);
        // setSquealContent("");
        // setSquealFile(null);
        // setSquealLocation(null);
      }}
      size="lg"
      fullscreen={isMobile}
      backdrop="static"
      centered
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Crea un tuo canale</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <div className="me-3">
            <img
              src={imagepreview || addimage}
              alt="profile"
              //   className="img-fluid"
              style={
                isMobile
                  ? {
                      cursor: "pointer",
                      maxWidth: "150px",
                      maxHeight: "150px",
                    }
                  : {
                      cursor: "pointer",
                      maxWidth: "250px",
                      maxHeight: "250px",
                    }
              }
              onClick={() => document.getElementById("fileInput").click()}
            />
            <input
              id="fileInput"
              type="file"
              hidden
              onChange={handleProfilePicChange}
            />
          </div>
          <div>
            <div className="mb-3">
              <h5>Nome</h5>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value.toLowerCase())}
                value={name}
              />
            </div>
          </div>
        </div>
        <div className="mb-3 mt-3">
          <h5>Descrizione</h5>
          <textarea
            rows={3}
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <UserSelector
          isprivate={isprivate}
          setIsPrivate={setIsPrivate}
          receiverlist={receiverlist}
          setReceiverList={setReceiverList}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <div className="d-flex align-items-center px-3">
            <ErrorMessage visible={missingfields} error={"Dati mancanti!"} />
          </div>

          <Button
            variant="success"
            onClick={handleCreate}
            style={{ fontWeight: "bold" }}
            // disabled={
            //   user.dailyChar === 0 ||
            //   contentType === "" ||
            //   user.dailyChar - currentchars < 0 ||
            //   (!isPublic && squealchannel.length === 0)
            // }
          >
            Crea canale
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ChannelBox;
