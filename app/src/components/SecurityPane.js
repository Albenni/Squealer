import theme from "../config/theme";
import { useState } from "react";
import {
  useAccordionButton,
  Accordion,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";
import { useMediaQuery } from "react-responsive";
import useAuth from "../hooks/useAuth";

function SecurityPane() {
  const { otp, setOtp } = useAuth();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [isImageError, setIsImageError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);

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

  function handleResetPassword() {
    console.log("Send email to " + sessionStorage.getItem("useremail"));

    // send email to user from backend, get otp and set it in context

    setEmailSent(true);
    setEmailAlert(true);
  }

  function handleCheckResetPwd(otp, newpassword) {
    // controllare che otp sia corrett, se si cambiare password
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
      <Accordion>
        <Card
          className="my-3"
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
        <Card
          className="my-3"
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Card.Header>
            <CustomToggle eventKey="4">Reset della password</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              {emailSent ? (
                <div className="d-flex justify-content-start align-items-center">
                  <input
                    type="text"
                    id="otpcheck"
                    className="form-control"
                    placeholder="Inserisci il codice OTP"
                    style={isMobile ? { width: "80%" } : { width: "50%" }}
                  />
                  <input
                    type="password"
                    id="newpasswordreset"
                    className="form-control"
                    placeholder="Nuova password"
                    style={isMobile ? { width: "80%" } : { width: "50%" }}
                  />
                  <Button
                    variant="outline-secondary"
                    className="mx-3"
                    onClick={() =>
                      handleCheckResetPwd(
                        document.getElementById("otpchec")?.value,
                        document.getElementById("newpasswordreset")?.value
                      )
                    }
                  >
                    Cambia
                  </Button>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    <p
                      style={{
                        pointerEvents: "none",
                      }}
                    >
                      Per il reset della password ti verrà mandata una mail a{" "}
                      {sessionStorage.getItem("useremail")}
                    </p>
                  </div>
                  <Button
                    variant="outline-secondary"
                    className="mx-3"
                    onClick={handleResetPassword}
                  >
                    Continua
                  </Button>
                </>
              )}
              <Alert
                variant="success"
                className="mt-3"
                transition
                style={
                  emailAlert
                    ? {
                        position: "fixed",
                        width: "95%",
                        top: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: "1000",
                      }
                    : { display: "none" }
                }
              >
                <Alert.Heading>Reset della password</Alert.Heading>
                <p
                  style={{
                    pointerEvents: "none",
                  }}
                >
                  Ti abbiamo mandato una mail a{" "}
                  {sessionStorage.getItem("useremail")} per il reset della
                  password
                </p>
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => setEmailAlert(false)}
                    variant="outline-success"
                  >
                    Chiudi
                  </Button>
                </div>
              </Alert>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default SecurityPane;
