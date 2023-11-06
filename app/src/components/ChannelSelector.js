import "../css/ChannelSelector.css";
import { useState } from "react";
import { InputGroup, Form, Button, ButtonGroup, Nav } from "react-bootstrap";

import { Trash3, Plus } from "react-bootstrap-icons";

import ErrorMessage from "./ErrorMessage";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function ChannelSelector(props) {
  const axiosInstance = useAxiosPrivate();

  const [postChannel, setPostChannel] = useState("Username");
  const [channelnotfound, setChannelNotFound] = useState(false);

  function AddSquealChannel() {
    setChannelNotFound(false);

    const channel = document.getElementById("SBoxControlInputChannel").value;

    const channeltype = document.getElementById("SBoxControlSelectChannel")
      .options[
      document.getElementById("SBoxControlSelectChannel").selectedIndex
    ].text;

    if (channel === "") {
      alert("Inserisci un canale valido!"); // Aggiungere messaggio di errore sotto alla selezione del canale
      return;
    }

    const toadd = channeltype + channel;

    if (props.squealchannel.includes(toadd)) {
      alert("Hai già inserito questo canale!");
      return;
    }

    // Check if the input exists in the database
    // If it exists, add it to the squealchannel array
    // else, show an error message

    if (channeltype === "@") {
      axiosInstance
        .get(
          config.endpoint.users + "?username=" + channel + "&exactMatch=true"
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            props.setSquealChannel([...props.squealchannel, toadd]);
          } else if (res.status === 204) {
            setChannelNotFound(true);
          }
        })
        .catch((err) => {
          setChannelNotFound(true);
          console.log(err);
        });
    } else if (channeltype === "§") {
      axiosInstance
        .get(
          config.endpoint.channels + "?channel=" + channel + "&exactMatch=true"
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            props.setSquealChannel([...props.squealchannel, toadd]);
          } else if (res.status === 204) {
            setChannelNotFound(true);
          }
        })
        .catch((err) => {
          setChannelNotFound(true);
          console.log(err);
        });
    } else if (channeltype === "#") {
      axiosInstance
        .get(
          config.endpoint.keyword + "?keyword=" + channel + "&exactMatch=true"
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            props.setSquealChannel([...props.squealchannel, toadd]);
          } else if (res.status === 204) {
            setChannelNotFound(true);
          }
        })
        .catch((err) => {
          setChannelNotFound(true);
          console.log(err);
        });
    }
  }

  function RemoveSquealChannel(toremove) {
    const index = props.squealchannel.indexOf(toremove);
    props.squealchannel.splice(index, 1);
    props.setSquealChannel([...props.squealchannel]);
  }

  return (
    <>
      <ErrorMessage
        visible={channelnotfound}
        error={"Il destinatario cercato non esiste!"}
      />

      <div className="button-container pb-3">
        <button
          className={props.isPublic ? "selected" : ""}
          onClick={() => props.setIsPublic(true)}
          style={{ borderRadius: 8 }}
        >
          Pubblico
        </button>
        <button
          className={!props.isPublic ? "selected" : ""}
          onClick={() => props.setIsPublic(false)}
          style={{ borderRadius: 8 }}
        >
          Privato
        </button>
      </div>

      {props.isPublic ? (
        <></>
      ) : (
        <>
          <InputGroup className="mb-3">
            <div className="col-md-2">
              <Form.Select
                placeholder="Seleziona il canale"
                id="SBoxControlSelectChannel"
                aria-label="SelectChannel"
                aria-describedby="SelectChannel"
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
              id="SBoxControlInputChannel"
              aria-label="Channel"
              aria-describedby="Channel"
              autoFocus
            />
            <Button variant="outline-secondary" onClick={AddSquealChannel}>
              <Plus />
            </Button>
          </InputGroup>
          {props.squealchannel.map((channel, key) => {
            return (
              <ButtonGroup
                key={key}
                aria-label={"Button for " + channel}
                className="pb-3 px-2"
              >
                <Button variant="outline-dark" disabled>
                  {channel}
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => RemoveSquealChannel(channel)}
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

export default ChannelSelector;
