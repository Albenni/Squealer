import { InputGroup, Form, Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

import { Trash3, Plus } from "react-bootstrap-icons";

function ChannelSelector(props) {
  const [postChannel, setPostChannel] = useState("Username");

  function AddSquealChannel() {
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
    // ATM every input is valid

    props.setSquealChannel([...props.squealchannel, toadd]);
  }

  function RemoveSquealChannel(toremove) {
    const index = props.squealchannel.indexOf(toremove);
    props.squealchannel.splice(index, 1);
    props.setSquealChannel([...props.squealchannel]);
  }

  return (
    <>
      <InputGroup className="mb-3">
        <div className="col-m-2">
          <Form.Select
            placeholder="Seleziona il canale"
            id="SBoxControlSelectChannel"
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
          id="SBoxControlInputChannel"
          aria-label="Channel"
          aria-describedby="Channel"
          autoFocus
        />
        <Button variant="outline-secondary" onClick={AddSquealChannel}>
          <Plus />
        </Button>
      </InputGroup>
      {props.squealchannel.map((channel) => {
        return (
          <ButtonGroup
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
  );
}

export default ChannelSelector;
