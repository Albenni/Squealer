import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, ButtonGroup, InputGroup } from "react-bootstrap";

import { Plus, Trash3 } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";

import addimage from "../assets/add-image.png";
import ErrorMessage from "./ErrorMessage";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function EditChannelBox({ show, setShowEdit, channelinfo }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagepreview, setImagePreview] = useState(null);

  // Select user
  const [usernotfound, setUserNotFound] = useState(false);
  const [alreadyfollower, setAlreadyFollower] = useState(false);
  const [receiverlist, setReceiverList] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      await axiosInstance
        .get(config.endpoint.channels + "/" + channelinfo._id + "/followers")
        .then((res) => {
          console.log(res);
          setFollowers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getFollowers();
  }, [channelinfo, axiosInstance]);

  useEffect(() => {
    return () => {
      if (imagepreview) URL.revokeObjectURL(imagepreview);
    };
  }, [imagepreview]);

  const deleteChannel = async () => {
    await axiosInstance
      .delete(config.endpoint.channels + "/" + channelinfo._id)
      .then((res) => {
        console.log(res);
        setShowEdit(false);
        navigate("/channels", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveChanges = async () => {
    console.log(description);
    console.log(image);
    console.log(receiverlist);

    const userid = sessionStorage.getItem("userid");

    // Update description
    if (description !== "") {
      await axiosInstance
        .patch(
          config.endpoint.channels + "/" + channelinfo._id + "/description",
          {
            description: description,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Update profile pic
    if (image !== null) {
      const formData = new FormData();
      formData.append("profilePic", image);

      await axiosInstance
        .patch(
          config.endpoint.channels + "/" + channelinfo._id + "/profilePic",
          formData
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Update followers
    if (receiverlist.length > 0) {
      const toupdate = receiverlist.map((item) => item.id);

      for (let follower of toupdate) {
        await axiosInstance
          .post(
            config.endpoint.users +
              "/" +
              follower +
              "/channels/" +
              channelinfo._id
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    setShowEdit(false);
    window.location.reload();
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleProfilePicChange(e) {
    if (e.target.files[0] === undefined) {
      setImage(null);
      setImagePreview(null);
      return;
    }

    const file = e.target.files[0];
    const imgfileRegex = /(image\/(png|jpg|jpeg|gif|svg|bmp|webp|HEIC))/i;

    if (imgfileRegex.test(file.type)) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      console.log(file);
    } else {
      setImage(null);
      console.log("Not file");
    }
  }

  function AddFollower() {
    setUserNotFound(false);

    let user = document.getElementById("CBoxControlInputUser").value;

    if (user === "") {
      alert("Inserisci un utente valido!"); // Aggiungere messaggio di errore sotto alla selezione del canale
      return;
    }

    if (receiverlist.includes(user)) {
      alert("Hai già inserito questo utente!");
      return;
    }

    // Check if the input exists in the database
    // If it exists, add it to the squealchannel array
    // else, show an error message

    axiosInstance
      .get(config.endpoint.users + "?username=" + user + "&exactMatch=true")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          user = {
            id: res.data._id,
            username: "@" + res.data.username,
          };

          // Aggiungere controllo per vedere se l'utente è già un follower del canale
          if (followers.find((obj) => obj._id === user.id)) {
            setAlreadyFollower(true);
            return;
          } else setReceiverList([...receiverlist, user]);
        } else if (res.status === 204) {
          setUserNotFound(true);
        }
      })
      .catch((err) => {
        setUserNotFound(true);
        console.log(err);
      });

    document.getElementById("CBoxControlInputUser").value = "";
  }

  function RemoveFollower(toremove) {
    const index = receiverlist.indexOf(toremove);
    receiverlist.splice(index, 1);
    setReceiverList([...receiverlist]);
  }

  return (
    <Modal
      show={show}
      onHide={() => setShowEdit(false)}
      size="lg"
      fullscreen={useMediaQuery({ query: "(max-width: 767px)" })}
      backdrop="static"
      centered
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Impostazioni canale</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label
              style={{
                fontWeight: "bold",
              }}
            >
              Descrizione
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Inserisci la descrizione del canale..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label
              style={{
                fontWeight: "bold",
              }}
            >
              Immagine profilo canale
            </Form.Label>
            <div className="me-3 mt-2">
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
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label
              style={{
                fontWeight: "bold",
              }}
            >
              Aggiungi membri al canale
            </Form.Label>

            {channelinfo.private ? (
              <>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder={"Username"}
                    id="CBoxControlInputUser"
                    aria-label="Channel"
                    aria-describedby="Channel"
                    autoFocus
                  />
                  <Button variant="outline-secondary" onClick={AddFollower}>
                    <Plus />
                  </Button>
                </InputGroup>

                <div className="pb-3">
                  <ErrorMessage
                    visible={usernotfound}
                    error={"Il destinatario cercato non esiste!"}
                  />
                  <ErrorMessage
                    visible={alreadyfollower}
                    error={"Il destinatario è già un membro di questo canale!"}
                  />
                </div>

                {receiverlist.map((item, key) => {
                  return (
                    <ButtonGroup
                      key={key}
                      aria-label={"Button for " + item.username}
                      className="pb-3 px-2"
                    >
                      <Button variant="outline-dark" disabled>
                        {item.username}
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => RemoveFollower(item)}
                      >
                        <Trash3 />
                      </Button>
                    </ButtonGroup>
                  );
                })}
              </>
            ) : (
              <div>Il canale è pubblico, non puoi aggiungere membri.</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="danger" onClick={deleteChannel}>
          Elimina canale
        </Button>

        <Button
          variant="primary"
          onClick={handleSaveChanges}
          disabled={
            description === "" && image === null && receiverlist.length === 0
          }
        >
          Salva Modifiche
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditChannelBox;
