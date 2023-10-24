import { Button, Card } from "react-bootstrap";

import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import ErrorMessage from "../components/ErrorMessage";
import OTPInput from "../components/OTPInput";
import GeneralAlert from "../components/GeneralAlert";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

// import logo from "../assets/SLogo.png";

function ResetPasswordPage() {
  const axiosInstance = useAxiosPrivate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [useremail, setUserEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [emailerror, setEmailError] = useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  function handleResetPassword(useremail) {
    if (useremail === undefined || useremail === "") {
      setEmailError(true);
      return;
    }

    if (!useremail.includes("@") && !useremail.includes(".")) {
      setEmailError(true);
      return;
    }

    axiosInstance
      .post(config.endpoint.newpassword, { email: useremail })
      .then((res) => {
        setEmailSent(true);
        setEmailAlert(true);
        setUserEmail(useremail);

        console.log(res);
      })
      .catch((err) => {
        setEmailError(true);
        console.log(err);
      });
  }
  function handleCheckResetPwd(newpwd) {
    const otp = sessionStorage.getItem("OTP");
    if (otp === null) {
      return;
    }

    if (newpwd === undefined || newpwd === "") {
      setPasswordError(true);
      return;
    }

    // Chiamata api per verificare il codice OTP e cambiare la password
    axiosInstance
      .patch(config.endpoint.newpassword, {
        userEmail: useremail,
        OTP: otp,
        newpassword: newpwd,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <GeneralAlert
        showAlert={emailAlert}
        setShowAlert={setEmailAlert}
        alertMessage={
          "Ti abbiamo mandato una mail a " +
          useremail +
          " per il reset della password"
        }
        GorR={true}
      />
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#93b3ff",
          height: "100vh",
        }}
      >
        {/* <img
          src={logo}
          alt="Logo"
          className="row"
          style={{
            width: isMobile ? "20%" : "10%",
            height: "auto",
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        /> */}
        <Card
          className="py-3"
          style={{
            width: isMobile ? "90%" : "40%",
            backgroundColor: "#f8f9fa",
            borderRadius: "20px",
          }}
        >
          <Card.Header className="d-fle">
            <h4>Reset della password</h4>
          </Card.Header>

          <Card.Body>
            {emailSent ? (
              <div className="d-column justify-content-start align-items-center">
                <div className="p-3">
                  <p
                    style={{
                      pointerEvents: "none",
                    }}
                  >
                    Inserisci il codice OTP che ti abbiamo mandato alla tua
                    email
                  </p>
                  <OTPInput otpCode={otpCode} />
                </div>
                <div className="p-3">
                  <p
                    style={{
                      pointerEvents: "none",
                    }}
                  >
                    Inserisci la nuova password
                  </p>
                  <input
                    type="password"
                    id="newpasswordreset"
                    className="form-control p-2"
                    placeholder="Nuova password"
                  />
                  <ErrorMessage
                    error="Inserisci una password valida"
                    visible={passworderror}
                  />
                </div>

                <Button
                  variant="outline-secondary"
                  className="mx-3"
                  onClick={() =>
                    handleCheckResetPwd(
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
                    Inserisci la tua email. <br />
                    Ti invieremo un codice OTP per il reset della password.
                  </p>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                  <input
                    type="text"
                    id="emailreset"
                    className="form-control"
                    placeholder="Email"
                    style={{ width: "80%" }}
                  />
                </div>
                <ErrorMessage
                  error="Inserisci una email valida"
                  visible={emailerror}
                />
                <Button
                  variant="outline-secondary"
                  className="p-2 mt-3"
                  onClick={() =>
                    handleResetPassword(
                      document.getElementById("emailreset")?.value
                    )
                  }
                >
                  Continua
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ResetPasswordPage;
