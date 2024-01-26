import "../../css/ChannelSelector.css";
import { useState } from "react";
import { InputGroup, Form, Button, ButtonGroup, Nav } from "react-bootstrap";
import { Trash3, Plus } from "react-bootstrap-icons";

import { useMediaQuery } from "react-responsive";

import ErrorMessage from "../ErrorMessage";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

function ChannelSelector(props) {
  const axiosInstance = useAxiosPrivate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [channelnotfound, setChannelNotFound] = useState(false);
  const [userorchannel, setUserOrChannel] = useState(false);

  async function AddSquealChannel() {
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

    let toadd = {
      type: props.squealType,
      channel: channeltype + channel,
    };

    if (props.squealchannel.includes(toadd.channel)) {
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
            toadd = {
              id: res.data._id,
              type: props.squealType,
              channel: channeltype + channel,
            };

            // If you add a user, you can't add a channel or a keyword
            if (
              props.squealchannel.some(
                (item) =>
                  item.type === "Channel" ||
                  props.squealchannel.some((item) => item.type === "Keyword")
              )
            ) {
              setUserOrChannel(true);
              return;
            }

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
            toadd = {
              id: res.data._id,
              type: props.squealType,
              channel: channeltype + channel,
            };

            // You can add a channel only if there are no users in the squealchannel array
            if (props.squealchannel.some((item) => item.type === "Username")) {
              setUserOrChannel(true);
              return;
            }

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
          config.endpoint.keywords + "?keyword=" + channel + "&exactMatch=true"
        )
        .then((res) => {
          console.log(res);
          // You can add a keyword only if there are no users in the squealchannel array
          if (props.squealchannel.some((item) => item.type === "Username")) {
            setUserOrChannel(true);
            return;
          }

          if (res.status === 200) {
            toadd = {
              id: res.data._id,
              type: props.squealType,
              channel: channeltype + channel,
            };

            props.setSquealChannel([...props.squealchannel, toadd]);
          } else if (res.status === 204) {
            axiosInstance
              .post(config.endpoint.keywords, {
                name: channel,
              })
              .then((res) => {
                console.log(res);
                toadd = {
                  id: res.data._id,
                  type: props.squealType,
                  channel: channeltype + channel,
                };

                props.setSquealChannel([...props.squealchannel, toadd]);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          setChannelNotFound(true);
          console.log(err);
        });
    }

    document.getElementById("SBoxControlInputChannel").value = "";
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
      <ErrorMessage
        visible={userorchannel}
        error={"Gli Squeal possono essere solo di tipo canale o utente!"}
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
            <div className="">
              <Form.Select
                placeholder="Seleziona il canale"
                id="SBoxControlSelectChannel"
                aria-label="SelectChannel"
                aria-describedby="SelectChannel"
                onChange={(e) => props.setSquealType(e.target.value)}
                style={
                  isMobile
                    ? {
                        backgroundColor: "#e9ecef",
                        fontWeight: "bold",
                        textAlign: "center",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        width: "65px",
                      }
                    : {
                        backgroundColor: "#e9ecef",
                        fontWeight: "bold",
                        textAlign: "center",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }
                }
              >
                <option value="Username">@</option>
                <option disabled>_________</option>
                <option value="Channel">§</option>
                <option value="Keyword">#</option>
              </Form.Select>
            </div>
            <Form.Control
              placeholder={props.squealType}
              id="SBoxControlInputChannel"
              aria-label="Channel"
              aria-describedby="Channel"
              autoFocus
              // Blocco la possibilità di postare in un canale ufficiale
              onChange={(e) =>
                props.squealType === "Channel"
                  ? (e.target.value = e.target.value.toLowerCase())
                  : e.target.value
              }
            />
            <Button variant="outline-secondary" onClick={AddSquealChannel}>
              <Plus />
            </Button>
          </InputGroup>
          {props.squealchannel.map((item, key) => {
            return (
              <ButtonGroup
                key={key}
                aria-label={"Button for " + item.channel}
                className="pb-3 px-2"
              >
                <Button variant="outline-dark" disabled>
                  {item.channel}
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

export default ChannelSelector;
