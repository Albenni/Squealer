import { Card } from "react-bootstrap";
import { ChatDots, PersonFillGear } from "react-bootstrap-icons";

function AccountPane({ user }) {
  return (
    <div className="row px-5 pb-5">
      <div className="col pt-5">
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
            <Card.Title className="pt-4">
              Benvenuto, {user.firstname}!
            </Card.Title>
            <Card.Subtitle className="pt-1 text-muted">
              La tua mail: {user.email}
            </Card.Subtitle>
            <Card.Text className="pt-3">
              Il tuo tipo di account: {user.professional ? "VIP" : "normale"}
            </Card.Text>

            <Card.Text>
              Tipo di account: normale, verificato, professional, moderatore
              squealer.
            </Card.Text>

            <Card.Text>
              Acquisto caratteri aggiuntivi giornalieri, settimanali, mensili
              (solo verificati e pro).
            </Card.Text>
            <Card.Text>
              Acquisto di un §canale personalizzato (caratteri minuscoli)
            </Card.Text>

            <Card.Text>
              https://agentestudio.com/uploads/ckeditor/pictures/1568/content_user-profile-design-15.jpg
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
