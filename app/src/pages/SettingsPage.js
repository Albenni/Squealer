import "../css/SettingsPage.css";
import theme from "../config/theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Tab, Nav, Modal } from "react-bootstrap";

import TopBar from "../components/TopBar";
import DeleteModal from "../components/DeleteModal";
import AccountPane from "../components/AccountPane";

import ShopPage from "./ShopPage";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function SettingsPage() {
  const userapi = useAxiosPrivate();
  const endpoint = config.endpoint.users + "/";
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [activetab, setActivetab] = useState("Il mio account");

  const [showdelete, setShowDelete] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("userid");

    userapi
      .get(endpoint + userId)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userapi]);

  function handleCheckDelete() {
    setShowDelete(true);
  }

  function handleDelete() {
    const userId = sessionStorage.getItem("userid");

    userapi
      .delete(endpoint + userId)
      .then((res) => {
        // console.log(res.data);
        sessionStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSProfessional() {
    console.log("SProfessional");
  }

  return (
    <>
      <TopBar />

      <DeleteModal
        show={showdelete}
        onHide={() => setShowDelete(false)}
        handleDelete={handleDelete}
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
                    onClick={() => setActivetab("Il mio profilo")}
                  >
                    Il mio profilo
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
                    onClick={() => setActivetab("Acquista nuovi caratteri")}
                  >
                    Acquista nuovi caratteri
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="fourth"
                    onClick={() => setActivetab("Squealer Professional")}
                    className="passaprofessional"
                  >
                    Passa a Squealer Professional
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
                  height: "100%",
                }}
              >
                <Tab.Pane eventKey="first">
                  <div className="container-fluid">
                    <AccountPane user={user} />
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
                <Tab.Pane eventKey="third">
                  <ShopPage />
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <div className="d-flex justify-content-center align-items-center p-5">
                    <Card style={{ borderRadius: "2vh" }}>
                      <Card.Body>
                        <Card.Title className="p-3 text-center">
                          Squealer Professional
                        </Card.Title>

                        <Card.Text>
                          Squealer Professional è un abbonamento che ti permette
                          di avere accesso a funzionalità esclusive, come
                          caratteri aggiuntivi, canali personalizzati e
                          amministratori.
                        </Card.Text>

                        <Card.Text>
                          L'abbonamento costa 9,99€ al mese e può essere
                          disattivato in qualsiasi momento.
                        </Card.Text>

                        <Card.Text>
                          L'abbonamento verrà rinnovato automaticamente ogni
                          mese.
                        </Card.Text>

                        <Card.Text>
                          Per disattivare l'abbonamento, vai su Impostazioni -
                          Sicurezza - Disattiva Squealer Professional.
                        </Card.Text>

                        <Button
                          variant="primary"
                          className="m-3"
                          onClick={handleSProfessional}
                        >
                          Attiva
                        </Button>
                      </Card.Body>
                    </Card>
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
