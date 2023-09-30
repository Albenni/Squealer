import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import PrivateMessages from "./PrivateMessages";

import { Card, Button, Tab, Nav, Modal } from "react-bootstrap";
import { ChatDots, PersonFillGear } from "react-bootstrap-icons";
import theme from "../config/theme";

function SettingsPage() {
  const [showchat, setShowChat] = useState(false);
  const [user, setUser] = useState({});

  const [activetab, setActivetab] = useState("Il mio account");
  useEffect(() => {
    // Fetch the user data from API
    setUser({
      id: 1,
      name: "Mario Rossi",
      picture: "https://picsum.photos/200",
      email: "ciaociao",
      role: "admin",
    });
  }, []);

  function handleCheckDelete() {}

  return (
    <>
      <TopBar setShowChat={setShowChat} />

      <PrivateMessages
        showchat={showchat}
        setShowChat={setShowChat}
        placement={"end"}
      />

      <div className="row">
        <Tab.Container defaultActiveKey="first">
          <div className="row container-fluid">
            <div className="col-md-3">
              <h1 className="text-center pt-5 px-3"> {activetab}</h1>
              <Nav variant="pills" className="flex-column p-5">
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    onClick={() => setActivetab("Il mio account")}
                  >
                    Il mio account
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    onClick={() => setActivetab("Sicurezza")}
                  >
                    Sicurezza
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="third"
                    onClick={() => setActivetab("I tuoi caratteri")}
                  >
                    I tuoi caratteri
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-flex justify-content-center align-items-end pt-5">
                  <Button variant="outline-danger" onClick={handleCheckDelete}>
                    Elimina account
                  </Button>
                </Nav.Item>
              </Nav>
            </div>
            <div className="col">
              <Tab.Content
                style={{
                  borderRadius: "5vh",
                  backgroundColor: theme.colors.transparent,
                }}
              >
                <Tab.Pane eventKey="first">
                  <div className="row px-5 pb-5">
                    <div className="col pt-5">
                      <Card style={{ borderRadius: "2vh" }}>
                        <Card.Body>
                          <Card.Img
                            className="mx-auto d-block"
                            variant="top"
                            src={user.picture}
                            style={{
                              width: "50%",
                              height: "auto",
                              borderRadius: "10%",
                              border: "1px solid #000",
                            }}
                          />
                          <Card.Title className="pt-4">
                            Benvenuto, {user.name}!
                          </Card.Title>
                          <Card.Subtitle className="pt-1 text-muted">
                            La tua mail: {user.email}
                          </Card.Subtitle>
                          <Card.Text className="pt-3">
                            Il tuo ruolo: {user.role}
                          </Card.Text>

                          <Card.Text>
                            Tipo di account: normale, verificato, professional,
                            moderatore squealer.
                          </Card.Text>

                          <Card.Text>
                            Acquisto caratteri aggiuntivi giornalieri,
                            settimanali, mensili (solo verificati e pro).
                          </Card.Text>
                          <Card.Text>
                            Acquisto di un §canale personalizzato (caratteri
                            minuscoli)
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
                            <Card.Title className="pt-3">
                              I tuoi caratteri.
                            </Card.Title>

                            <Card.Text>Caratteri disponibili</Card.Text>
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

                            <Card.Title className="pt-3">
                              I tuoi amministratori.
                            </Card.Title>

                            <Card.Text>
                              Aggiunta di altri amministratori al §canale di
                              proprietà
                            </Card.Text>

                            <Card.Text>
                              Scelta di un social media manager - rimozione del
                              SMM. (entrambi professional: sia utente sia SMM)
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="container">
                    <p>Cambia nome</p>
                    <p>Cambia email</p>
                    <p>Cambia password</p>
                    <p>Reset password</p>
                    <p>Cambia foto</p>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </div>
    </>
  );
}

export default SettingsPage;
