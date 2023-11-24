import theme from "../../config/theme";
import { useState } from "react";
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

  function handleSync(smmid) {
    axiosInstance
      .post(config.endpoint.users + "/" + user._id + "/smm", {
        smmId: smmid,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setShow(false);
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
              <Card.Text className="pt-3 pe-none">
                La tua mail: {user.email}
              </Card.Text>
              <Card.Text className="pt-3 pe-none">
                Il tuo tipo di account:{" "}
                {user.professional ? "Professional" : "Regular"}
              </Card.Text>

              <Card.Text className="pt-3 pe-none">
                Il tuo §canale: {user.channel ? user.channel : "Nessuno"}
              </Card.Text>

              <Card.Text
                className="pt-3 pe-none"
                style={{
                  color: "red",
                }}
              >
                Acquista un §canale personalizzato (caratteri minuscoli)
              </Card.Text>
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

                <Card.Text>
                  Caratteri disponibili: {user.charAvailable}
                </Card.Text>
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

                {user.professional && (
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
                )}
                <Card.Text className="pe-none">
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
