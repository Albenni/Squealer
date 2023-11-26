import "../css/TopBar.css";
import theme from "../config/theme";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Button, Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Bell, CircleFill } from "react-bootstrap-icons";

import SearchBar from "./SearchBar";
import PrivateMessages from "../pages/PrivateMessages";

import squeallogo from "../assets/SLogo.png";
import guesticon from "../assets/guesticon.png";

import logapi from "../api/auth";
import config from "../config/config";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function TopBar() {
  const { setAuth, notifs, setNotifs } = useAuth();
  const axiosInstance = useAxiosPrivate();

  const location = useLocation();
  const navigate = useNavigate();

  const [showchat, setShowChat] = useState(false);
  const [username, setUsername] = useState({});

  useEffect(() => {
    if (sessionStorage.getItem("userid") === "guest") {
      setShowChat(false);
      return;
    }

    const fetchUsername = async () => {
      axiosInstance
        .get(config.endpoint.users + "/" + sessionStorage.getItem("userid"))
        .then((res) => {
          const name = res.data.firstname;
          const lastname = res.data.surname;
          setUsername({ name, lastname });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUsername();
  }, []);

  function handleLogout() {
    logapi
      .userLogout()
      .then((res) => {
        if (res.status === 204) {
          sessionStorage.clear();
          setAuth("");
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <Navbar bg="light" data-bs-theme="dark" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/feed">
            <div className="row">
              <div className="col">
                <img
                  alt="Logo"
                  src={squeallogo}
                  style={{ maxHeight: "3rem" }}
                />
              </div>

              <div className="col d-none d-sm-block">
                <h1
                  className="px-2 align-middle"
                  style={{ color: theme.colors.dark }}
                >
                  Squealer
                </h1>
              </div>
            </div>
          </Navbar.Brand>

          {sessionStorage.getItem("userid") === "guest" ? (
            <div className="d-flex align-items-center">
              {location.pathname !== "/settings" && (
                <div>
                  <SearchBar />
                </div>
              )}
              <Dropdown>
                <Dropdown.Toggle variant="light">
                  <img
                    alt="Profile"
                    src={guesticon}
                    style={{ maxHeight: "4.5vh" }}
                    className="rounded-circle"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu align={"end"}>
                  <Dropdown.ItemText>
                    <h6>Ciao, Guest!</h6>
                  </Dropdown.ItemText>
                  <Dropdown.Item
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/", { replace: true });
                    }}
                  >
                    Login
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <>
              <PrivateMessages
                showchat={showchat}
                setShowChat={setShowChat}
                placement={"end"}
              />

              <Nav className="justify-content-end align-items-center">
                {location.pathname !== "/settings" && (
                  <div>
                    <SearchBar />
                  </div>
                )}
                <div className="shop-chat-buttons">
                  <Nav.Link
                    onClick={() => {
                      setShowChat(true);
                      setNotifs(false);
                    }}
                  >
                    <Button variant="outline-primary">
                      <Bell size={20} />
                    </Button>
                    {notifs && (
                      <CircleFill
                        size={15}
                        color="red"
                        aria-label="Logo notifica"
                        aria-describedby="Ci sono nuovi messaggi"
                        style={{
                          position: "relative",
                          top: "-1rem",
                          right: "0.5rem",
                        }}
                      />
                    )}
                  </Nav.Link>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="light">
                    <img
                      alt="Profile"
                      src="https://picsum.photos/200"
                      style={{ maxHeight: "3rem" }}
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align={"end"}>
                    <Dropdown.ItemText>
                      <h6>Ciao, {username.name + " " + username.lastname}!</h6>
                    </Dropdown.ItemText>
                    <Dropdown.Item href="/settings">Impostazioni</Dropdown.Item>
                    <div className="responsive-addons">
                      <Dropdown.Item
                        aria-label="Messaggi"
                        aria-describedby="Sezione messaggi"
                        onClick={() => {
                          setShowChat(true);
                          setNotifs(false);
                        }}
                      >
                        {notifs && (
                          <CircleFill
                            size={10}
                            color="red"
                            aria-label="Logo notifica"
                            aria-describedby="Ci sono nuove messaggi"
                          />
                        )}{" "}
                        Messaggi
                      </Dropdown.Item>
                    </div>

                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
