import "../css/TopBar.css";
import theme from "../config/theme";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Button, Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";

import SearchBar from "./SearchBar";
import PrivateMessages from "../pages/PrivateMessages";

import squeallogo from "../assets/SLogo.png";

import logapi from "../api/auth";

function TopBar(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [showchat, setShowChat] = useState(false);

  // const [login, setLogin] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setLogin(true);
  //     return;
  //   }
  //   setLogin(false);
  // }, []);

  function handleLogout() {
    logapi
      .userLogout()
      .then((res) => {
        if (res.status === 204) {
          sessionStorage.clear();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <PrivateMessages
        showchat={showchat}
        setShowChat={setShowChat}
        placement={"end"}
      />
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

          {location.pathname === "/feed" && (
            <div className="justify-content-center">
              <SearchBar />
            </div>
          )}

          {location.pathname !== "/" && (
            <Nav className="justify-content-end">
              {/* <Nav.Link href={props.isLogged ? "/settings" : "/login"}> */}

              <div className="shop-chat-buttons">
                <Nav.Link onClick={() => setShowChat(true)}>
                  <Button variant="outline-primary">
                    <Bell size={20} />
                  </Button>
                </Nav.Link>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="light">
                  <img
                    alt="Profile"
                    src="https://picsum.photos/200"
                    style={{ maxHeight: "4.5vh" }}
                    className="rounded-circle"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu align={"end"}>
                  <Dropdown.Item href="/settings">Impostazioni</Dropdown.Item>
                  <div className="responsive-addons">
                    <Dropdown.Item href="/shop">Compra caratteri</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowChat(true)}>
                      Notifiche
                    </Dropdown.Item>
                  </div>

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
