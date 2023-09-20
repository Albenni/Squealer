import theme from "../config/theme";

import { Navbar, Container, Nav } from "react-bootstrap";

import { Button } from "react-bootstrap";
import SearchBar from "./SearchBar";

import { Gear, Bell } from "react-bootstrap-icons";
import squeallogo from "../assets/SLogo.png";

import BooksData from "../assets/DataExample.json";

function TopBar(props) {
  return (
    <Navbar bg="light" data-bs-theme="dark" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <div className="row">
            <div className="col">
              <img alt="Logo" src={squeallogo} style={{ maxHeight: "3rem" }} />
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

        {props.isnotloginpage && (
          <>
            <div className="justify-content-center">
              <SearchBar data={BooksData} />
            </div>

            <Nav className="justify-content-end">
              {/* <Nav.Link href={props.isLogged ? "/settings" : "/login"}> */}
              <Nav.Link href="/settings">
                <Button variant="outline-primary">
                  <Gear size={20} />
                </Button>
              </Nav.Link>
              <Nav.Link onClick={() => props.setShowChat(true)}>
                <Button variant="outline-primary">
                  <Bell size={20} />
                </Button>
              </Nav.Link>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default TopBar;
