import theme from "../../config/theme";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import {
  ChatDots,
  PersonFillGear,
  PatchCheckFill,
} from "react-bootstrap-icons";

import { useMediaQuery } from "react-responsive";

import squeallogo from "../../assets/SLogo.png";

import SMMModal from "./SMMModal";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

function AccountPane({ user }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [channels, setChannels] = useState([]);
  const [smm, setSmm] = useState({});

  useEffect(() => {
    getChannels();
    getSmm();

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

    async function getSmm() {
      await axiosInstance
        .get(
          config.endpoint.users +
            "/" +
            sessionStorage.getItem("userid") +
            "/smm"
        )
        .then((res) => {
          if (res.status === 204) {
            setSmm(null);
            return;
          }

          axiosInstance
            .get(
              config.endpoint.users + "/" + res.data.smmId + "?exactMatch=true"
            )
            .then((res) => {
              console.log(res.data);
              setSmm(res.data);
            })
            .catch((err) => {
              console.log(err);
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

  async function handleSync(smmid) {
    if (!smm) {
      await axiosInstance
        .post(config.endpoint.users + "/" + user._id + "/smm", {
          smmId: smmid,
        })
        .then((res) => {
          console.log(res);
          setShow(false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axiosInstance
        .delete(config.endpoint.users + "/" + user._id + "/smm", {
          smmId: smm._id,
        })
        .then((res) => {
          console.log(res);
          axiosInstance
            .post(config.endpoint.users + "/" + user._id + "/smm", {
              smmId: smmid,
            })
            .then((res) => {
              console.log(res);
              setShow(false);
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <SMMModal
        show={show}
        onHide={() => setShow(false)}
        handleSync={handleSync}
        smm={smm}
      />

      <div className={isMobile ? "p-3" : "row px-5 pb-5"}>
        <div className={isMobile ? "" : "col pt-5"}>
          <Card style={{ borderRadius: "2vh" }}>
            <Card.Body>
              <Card.Img
                className="mx-auto d-block"
                variant="top"
                src={
                  user.profilePic
                    ? config.URL +
                      "/profilePic/" +
                      sessionStorage.getItem("userid") +
                      user.profilePic
                    : squeallogo
                }
                style={{
                  width: "50%",
                  height: "auto",
                  borderRadius: "10%",
                  border: "1px solid #000",
                  objectFit: user.profilePic ? "cover" : "contain",
                }}
              />
              <Card.Title className="pt-4 d-flex" tabIndex={0}>
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
              <Card.Text className="pt-2 pe-none" tabIndex={0}>
                La tua mail: {user.email}
              </Card.Text>
              <Card.Text className="pt-2 pe-none" tabIndex={0}>
                Il tuo tipo di account:{" "}
                {user.professional ? "Professional" : "Regular"}
              </Card.Text>

              <div className="pt-2" tabIndex={0}>
                <p>
                  I tuoi §canali: {channels.length === 0 && "Nessun canale."}
                </p>

                {channels.length > 0 &&
                  channels.map((channel, key) => (
                    <div key={key} className="pb-2">
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
                <Card.Title className="pt-3" tabIndex={0}>
                  I tuoi caratteri.
                </Card.Title>

                <Card.Text tabIndex={0}>
                  Caratteri giornalieri: {user.dailyChar}
                </Card.Text>
                <Card.Text tabIndex={0}>
                  Caratteri settimanali: {user.weeklyChar}
                </Card.Text>
                <Card.Text tabIndex={0}>
                  Caratteri mensili: {user.monthlyChar}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="pt-5">
            <Card style={{ borderRadius: "2vh" }}>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center py-2">
                  <PersonFillGear size={"3vh"} color={theme.colors.dark} />
                </div>

                <Card.Title className="pt-3" tabIndex={0}>
                  Il tuo Social Media Manager.
                </Card.Title>

                {user.professional ? (
                  <div className="d-flex flex-column align-items-center">
                    {!smm && (
                      <div className="mb-3" tabIndex={0}>
                        Non hai un Social Media Manager.
                      </div>
                    )}

                    {smm && (
                      <>
                        <Button
                          className="mb-3"
                          variant="dark"
                          style={{
                            fontWeight: "bold",
                            color: theme.colors.lightgrey,
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "5px 10px",
                          }}
                          onClick={() =>
                            navigate("/" + smm.username, { replace: true })
                          }
                          tabIndex={0}
                        >
                          {smm?.firstname} {smm?.surname}
                        </Button>
                      </>
                    )}
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="outline-dark"
                        onClick={() => setShow(true)}
                        style={{
                          borderTopWidth: "2px",
                          borderTopStyle: "solid",
                          borderTopColor: theme.colors.dark,
                          borderRadius: "10px",
                          padding: "5px 10px",
                        }}
                      >
                        Modifica il tuo SMM
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      color: theme.colors.dark,
                    }}
                    tabIndex={0}
                  >
                    Passa ad un account Professional per avere un Social Media
                    Manager.
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPane;
