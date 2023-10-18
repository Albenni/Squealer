import { Card } from "react-bootstrap";
import {
  ChatDots,
  PersonFillGear,
  PatchCheckFill,
} from "react-bootstrap-icons";

import { useMediaQuery } from "react-responsive";

function AccountPane({ user }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
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
                  <PatchCheckFill size={"2vh"} className="ml-2" color="green" />
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

            <Card.Text className="pt-3 pe-none">
              Acquista un §canale personalizzato (caratteri minuscoli)
            </Card.Text>

            <Card.Text>Change your account settings</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="col">
        <div className="pt-5">
          <Card style={{ borderRadius: "2vh" }}>
            <Card.Body>
              <div className="d-flex justify-content-center align-items-center py-2">
                <ChatDots size={"3vh"} />
              </div>
              <Card.Title className="pt-3">I tuoi caratteri.</Card.Title>

              <Card.Text>Caratteri disponibili: {user.charAvailable}</Card.Text>
              <Card.Text>Caratteri settimanali</Card.Text>
              <Card.Text>Compra caratteri </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="pt-5">
          <Card style={{ borderRadius: "2vh" }}>
            <Card.Body>
              <div className="d-flex justify-content-center align-items-center py-2">
                <PersonFillGear size={"3vh"} />
              </div>

              <Card.Title className="pt-3">I tuoi amministratori.</Card.Title>

              <Card.Text>
                Aggiunta di altri amministratori al §canale di proprietà
              </Card.Text>

              <Card.Text>
                Scelta di un social media manager - rimozione del SMM. (entrambi
                professional: sia utente sia SMM)
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AccountPane;
