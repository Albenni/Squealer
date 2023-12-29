import theme from "../../config/theme";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import {
  ChatDots,
  PersonFillGear,
  PatchCheckFill,
} from "react-bootstrap-icons";

import { useMediaQuery } from "react-responsive";

import SMMModal from "./SMMModal";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

function AccountPane({ user }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const axiosInstance = useAxiosPrivate();

  const [show, setShow] = useState(false);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getChannels();

    async function getChannels() {
      await axiosInstance
        .get(config.endpoint.channels)
        .then((res) => {
          res.data.forEach((channel) => {
            if (
              channel.admins.find(
                (obj) => obj.userId._id === sessionStorage.getItem("userid")
              )
            ) {
              setChannels((channels) => [...channels, channel]);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      setChannels([]);
    };
  }, [axiosInstance]);

  function handleSync(smmid) {
    axiosInstance
      .post(config.endpoint.users + "/" + user._id + "/smm", {
        smmId: smmid,
      })
      .then((res) => {
        console.log(res);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <SMMModal
        show={show}
        onHide={() => setShow(false)}
        handleSync={handleSync}
      />

      <div className={isMobile ? "p-3" : "row px-5 pb-5"}>
        <div className={isMobile ? "" : "col pt-5"}>
          <Card style={{ borderRadius: "2vh" }}>
            <Card.Body>
              <Card.Img
                className="mx-auto d-block"
                variant="top"
                src="https://picsum.photos/200/"
                // src={user.picture}
                style={{
                  width: "50%",
                  height: "auto",
                  borderRadius: "10%",
                  border: "1px solid #000",
                }}
              />
              <Card.Title className="pt-4 d-flex">
                Benvenuto, {user.firstname}!
                <div className="px-2">
                  {user.verified ? (
                    <PatchCheckFill
                      size={"2vh"}
                      className="ml-2"
                      color="green"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </Card.Title>
              <Card.Text className="pt-2 pe-none">
                La tua mail: {user.email}
              </Card.Text>
              <Card.Text className="pt-2 pe-none">
                Il tuo tipo di account:{" "}
                {user.professional ? "Professional" : "Regular"}
              </Card.Text>

              <div className="pt-2">
                <p>
                  I tuoi §canali: {channels.length === 0 && "Nessun canale."}
                </p>

                {channels.length > 0 &&
                  channels.map((channel, key) => (
                    <div key={key}>
                      <a
                        href={"/channel/" + channel.name}
                        style={{
                          color: theme.colors.dark,
                          textDecoration: "none",
                          cursor: "pointer",
                          marginLeft: "10px",
                          border: "1px solid " + theme.colors.dark,
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      >
                        §{channel.name}
                      </a>
                    </div>
                  ))}
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <div className="pt-5">
            <Card style={{ borderRadius: "2vh", pointerEvents: "none" }}>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center py-2">
                  <ChatDots size={"3vh"} color={theme.colors.dark} />
                </div>
                <Card.Title className="pt-3">I tuoi caratteri.</Card.Title>

                <Card.Text>Caratteri giornalieri: {user.dailyChar}</Card.Text>
                <Card.Text>Caratteri settimanali: {user.weeklyChar}</Card.Text>
                <Card.Text>Caratteri mensili: {user.monthlyChar}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="pt-5">
            <Card style={{ borderRadius: "2vh" }}>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center py-2">
                  <PersonFillGear size={"3vh"} color={theme.colors.dark} />
                </div>

                <Card.Title className="pt-3">I tuoi amministratori.</Card.Title>

                {user.professional ? (
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Text
                      className="pe-none"
                      style={{
                        marginBottom: "0px",
                      }}
                    >
                      Scegli il tuo Social Media Manager
                    </Card.Text>
                    <Button
                      variant="outline-dark"
                      onClick={() => setShow(true)}
                    >
                      Aggiungi
                    </Button>
                  </div>
                ) : (
                  <div
                    style={{
                      color: theme.colors.dark,
                    }}
                  >
                    Passa ad un account Professional per avere un Social Media
                    Manager.
                  </div>
                )}
                <Card.Text
                  className="pe-none"
                  style={{
                    color: theme.colors.danger,
                  }}
                >
                  Gli amministratori del tuo canale: Se hai un canale, puoi
                  aggiungere un amministratore che gestirà il tuo canale per te.
                  <br />
                  Senno "Non sei proprietario di nessun canale."
                  <br />
                  Oppure "Non hai nessun amministratore."
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPane;
