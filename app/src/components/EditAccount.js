import theme from "../config/theme";
import { useState } from "react";
import { useAccordionButton, Accordion, Button, Card } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";
import { useMediaQuery } from "react-responsive";

function EditAccountPane() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [isImageError, setIsImageError] = useState(false);

  function handleChangeUsername(newusername) {
    console.log(newusername);
  }

  function handleChangeProfilePic(newprofilepic) {
    if (newprofilepic === undefined) {
      return;
    } else if (!newprofilepic.type.includes("image")) {
      setIsImageError(true);
      return;
    }
    setIsImageError(false);
  }

  function handleChangeEmail(newemail) {
    console.log(newemail);
  }

  function handleChangePassword(oldpassword, newpassword) {
    console.log(oldpassword, newpassword);
  }

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {});

    return (
      <Button
        variant="link"
        className="text-dark"
        style={{ backgroundColor: "transparent" }}
        onClick={decoratedOnClick}
      >
        {children}
      </Button>
    );
  }

  return (
    <div className="container pt-4">
      <Accordion className="py-1">
        <Card
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Card.Header>
            <CustomToggle eventKey="0">Cambia username</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="d-flex justify-content-start align-items-center">
                <input
                  type="text"
                  id="usernamechange"
                  className="form-control"
                  placeholder="Nuovo username"
                  style={isMobile ? { width: "80%" } : { width: "50%" }}
                />
                <Button
                  variant="outline-secondary"
                  className="mx-3"
                  onClick={() =>
                    handleChangeUsername(
                      document.getElementById("usernamechange")?.value
                    )
                  }
                >
                  Cambia
                </Button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card
          className="my-3"
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Card.Header>
            <CustomToggle eventKey="1">Cambia immagine profilo</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div className="d-flex justify-content-start align-items-center">
                <input
                  type="file"
                  id="propicchange"
                  className="form-control"
                  placeholder="Nuova immagine profilo"
                  style={isMobile ? { width: "80%" } : { width: "50%" }}
                />
                <Button
                  variant="outline-secondary"
                  className="mx-3"
                  onClick={() =>
                    handleChangeProfilePic(
                      document.getElementById("propicchange")?.files[0]
                    )
                  }
                >
                  Cambia
                </Button>
              </div>
              <ErrorMessage
                visible={isImageError}
                error="Il file deve essere un'immagine"
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card
          className="my-3"
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Card.Header>
            <CustomToggle eventKey="2">Cambia email</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <div className="d-flex justify-content-start align-items-center">
                <input
                  type="text"
                  id="emailchange"
                  className="form-control"
                  placeholder="Nuova email"
                  style={isMobile ? { width: "80%" } : { width: "50%" }}
                />
                <Button
                  variant="outline-secondary"
                  className="mx-3"
                  onClick={() =>
                    handleChangeEmail(
                      document.getElementById("emailchange")?.value
                    )
                  }
                >
                  Cambia
                </Button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card
          className="my-3"
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Card.Header>
            <CustomToggle eventKey="3">Cambia password</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <div className="d-flex justify-content-start align-items-center">
                <input
                  type="password"
                  id="oldpasswordchange"
                  className="form-control"
                  placeholder="Vecchia password"
                  style={isMobile ? { width: "80%" } : { width: "50%" }}
                />
                <input
                  type="password"
                  id="newpasswordchange"
                  className="form-control"
                  placeholder="Nuova password"
                  style={isMobile ? { width: "80%" } : { width: "50%" }}
                />
                <Button
                  variant="outline-secondary"
                  className="mx-3"
                  onClick={() =>
                    handleChangePassword(
                      document.getElementById("oldpasswordchange")?.value,
                      document.getElementById("newpasswordchange")?.value
                    )
                  }
                >
                  Cambia
                </Button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default EditAccountPane;
