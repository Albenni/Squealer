import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";

import { Card, Button, Tab, Row, Col, Nav } from "react-bootstrap";

function SettingsPage() {
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

  return (
    <>
      <TopBar />

      <div className="row">
        <Tab.Container defaultActiveKey="first">
          <div className="row container-fluid">
            <div className="col-sm-3">
              <h1 className="text-center pt-5 px-3"> {activetab}</h1>
              <Nav
                variant="pills"
                className="flex-column p-5"
                style={{ height: "100vh" }}
              >
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
                    onClick={() => setActivetab("Cambia password")}
                  >
                    Cambia password
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div className="col">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="row p-5">
                    <div className="col">
                      <div className="pt-5">
                        <Card>
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
                                objectFit: "cover",
                              }}
                            />
                            <Card.Title className="pt-5">
                              Benvenuto, {user.name}!
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {user.email}
                            </Card.Subtitle>
                            <Card.Text>Your role is {user.role}</Card.Text>
                            <Card.Text>
                              Creazione account, cambio password, reset
                              password, eliminazione.
                            </Card.Text>
                            <Card.Text>
                              Tipo di account: normale, verificato,
                              professional, moderatore squealer.
                            </Card.Text>
                            <Card.Text>
                              Scelta di un social media manager - rimozione del
                              SMM. (entrambi professional: sia utente sia SMM)
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
                              Aggiunta di altri amministratori al §canale di
                              proprietà
                            </Card.Text>

                            <Card.Text>
                              https://agentestudio.com/uploads/ckeditor/pictures/1568/content_user-profile-design-15.jpg
                            </Card.Text>
                            <Card.Text>Change your account settings</Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                    <div className="col">
                      <div className="pt-5">
                        <Card>
                          <Card.Body>
                            <Card.Title className="pt-5">
                              I tuoi caratteri.
                            </Card.Title>

                            <Card.Text>Caratteri disponibili</Card.Text>
                            <Card.Text>Caratteri settimanali</Card.Text>
                            <Card.Text>Compra caratteri </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </div>
    </>
  );
}

export default SettingsPage;
