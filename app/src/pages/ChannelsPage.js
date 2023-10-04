import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { ListGroup, Button } from "react-bootstrap";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

const ChannelsPage = () => {
  const userapi = useAxiosPrivate();

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // DA CAMBIARE, BISOGNA CONTROLLARE QUALI CANALI SONO GIA SEGUITI DALL'UTENTE

    userapi
      .get(config.endpoint.channels)
      .then((res) => {
        console.log(res.data);
        setChannels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userapi]);

  function handleFollow(channel) {
    console.log("Follow channel");
  }

  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2em",
            marginBottom: "2em",
          }}
        >
          <h1>Scopri nuovi canali</h1>
        </div>
        <div className="container">
          <ListGroup>
            {channels.map((channel) => (
              <ListGroup.Item key={channel.id}>
                <div className="row">
                  <div className="col">
                    <h4>{channel.name}</h4>
                  </div>
                  <div className="col d-flex justify-content-end">
                    {channel.followed ? (
                      <Button
                        variant="outline-success"
                        onClick={() => handleFollow(channel.name)}
                      >
                        Segui
                      </Button>
                    ) : (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleFollow(channel.name)}
                      >
                        Non seguire
                      </Button>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default ChannelsPage;
