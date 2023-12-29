import { useState } from "react";
import { InputGroup, Form, Button, ButtonGroup } from "react-bootstrap";

import { Trash3, Plus } from "react-bootstrap-icons";

import ErrorMessage from "./ErrorMessage";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function UserSelector({
  isprivate,
  setIsPrivate,
  receiverlist,
  setReceiverList,
}) {
  const axiosInstance = useAxiosPrivate();

  const [usernotfound, setUserNotFound] = useState(false);

  function AddSquealChannel() {
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

          setReceiverList([...receiverlist, user]);
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

  function RemoveSquealChannel(toremove) {
    const index = receiverlist.indexOf(toremove);
    receiverlist.splice(index, 1);
    setReceiverList([...receiverlist]);
  }

  return (
    <>
      <div className="button-container pb-3">
        <button
          className={!isprivate ? "selected" : ""}
          onClick={() => setIsPrivate(false)}
          style={{ borderRadius: 8 }}
        >
          Pubblico
        </button>
        <button
          className={isprivate ? "selected" : ""}
          onClick={() => setIsPrivate(true)}
          style={{ borderRadius: 8 }}
        >
          Privato
        </button>
      </div>

      {!isprivate ? (
        <></>
      ) : (
        <>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder={"Username"}
              id="CBoxControlInputUser"
              aria-label="Channel"
              aria-describedby="Channel"
              autoFocus
            />
            <Button variant="outline-secondary" onClick={AddSquealChannel}>
              <Plus />
            </Button>
          </InputGroup>

          <div className="pb-3">
            <ErrorMessage
              visible={usernotfound}
              error={"Il destinatario cercato non esiste!"}
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
                  onClick={() => RemoveSquealChannel(item)}
                >
                  <Trash3 />
                </Button>
              </ButtonGroup>
            );
          })}
        </>
      )}
    </>
  );
}

export default UserSelector;
