import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import TopBar from "../components/TopBar";

import logo from "../assets/SLogo.png";

import { Image, Tab, Tabs } from "react-bootstrap";

import ErrorMessage from "../components/ErrorMessage";
import theme from "../config/theme";

import authapi from "../api/login";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/feed";

  // Register fields
  const [registerobj, setRegisterobj] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [registerFailed, setRegisterFailed] = useState(false);

  const [passwordmatch, setPasswordMatch] = useState(false);
  const [missingFieldsreg, setMissingFieldsreg] = useState(false);
  const [userNameTaken, setUserNameTaken] = useState(false);

  // Login fields
  const [loginobj, setLoginobj] = useState({
    username: "",
    password: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const [missingFields, setMissingFields] = useState(false);

  // Trovare un modo per vedere se l'utente è loggato e nel caso disabilitare questa pagina

  async function submitFormRegister(event) {
    event.preventDefault();

    if (
      !registerobj.username ||
      !registerobj.firstname ||
      !registerobj.lastname ||
      !registerobj.email ||
      !registerobj.password ||
      !registerobj.confirmpassword
    ) {
      setMissingFieldsreg(true);
      return;
    }
    setMissingFieldsreg(false);

    if (passwordmatch) {
      return;
    }

    authapi
      .postRegister({
        user: registerobj.username,
        pwd: registerobj.password,
        firstname: registerobj.firstname,
        surname: registerobj.lastname,
        email: registerobj.email,
      })
      .then((response) => {
        console.log(response);
        setAuth(response?.data?.accessToken);

        navigate(from, { replace: true });
      })
      .catch((err) => {
        setRegisterFailed(true);
        if (err.response.status === 400) alert("I campi sono obbligatori");
        else if (err.response.status === 409) setUserNameTaken(true);
      });
  }

  async function submitFormLogin(event) {
    event.preventDefault();

    if (!loginobj.username || !loginobj.password) {
      setMissingFields(true);
      return;
    }

    setMissingFields(false);

    authapi
      .postLogin({ user: loginobj.username, pwd: loginobj.password })
      .then((response) => {
        // console.log(response);

        setAuth(response?.data?.accessToken);

        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoginFailed(true);
        if (err.response.status === 400)
          alert("Username e password sono obbligatori");
        else if (err.response.status === 401)
          alert("Username e password sbagliati");
      });
  }

  return (
    <>
      <TopBar />
      <div
        className="container-fluid"
        style={{ backgroundColor: theme.colors.loginbg, height: "100vh" }}
      >
        <div
          className="container-fluid row"
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="col-sm-4">
            <div className="row">
              <Image src={logo} fluid />
            </div>
          </div>
          <div
            className="col-sm-3"
            style={{
              backgroundColor: theme.colors.white,
              padding: "2rem",
              borderRadius: "1rem",
            }}
          >
            <Tabs defaultActiveKey="accedi" justify>
              <Tab eventKey="accedi" title="Accedi">
                <form
                  className="text-align-center container"
                  onSubmit={submitFormLogin}
                >
                  <div className="form-group py-2">
                    <ErrorMessage
                      error="Username o password non valida"
                      visible={loginFailed}
                    />
                    <label>Username</label>
                    <input
                      type="Username"
                      className="form-control"
                      placeholder="Inserisci username"
                      onChange={(e) =>
                        setLoginobj({
                          username: e.target.value,
                          password: loginobj.password,
                        })
                      }
                    />
                  </div>
                  <div className="form-group py-2">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Inserisci password"
                      onChange={(e) => {
                        setLoginobj({
                          username: loginobj.username,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <ErrorMessage
                    error="Inserisci username e password"
                    visible={missingFields}
                  />
                  <div className="pb-2">
                    <Link to="NewPassword">Hai dimenticato la password</Link>?
                  </div>
                  <button type="submit" className="text btn btn-dark">
                    Accedi
                  </button>
                </form>
              </Tab>
              <Tab eventKey="registrati" title="Registrati">
                <form
                  className="text-align-center container"
                  onSubmit={submitFormRegister}
                >
                  {/* <ErrorMessage
                    error="Registrazione non riuscita"
                    visible={registerFailed}
                  /> */}
                  <div className="form-group py-2">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Inserisci username"
                      onChange={(e) =>
                        setRegisterobj({
                          ...registerobj,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>
                  <ErrorMessage
                    error="Username già in uso"
                    visible={userNameTaken}
                  />
                  <div className="form-group py-2">
                    <label>Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Inserisci nome"
                      onChange={(e) =>
                        setRegisterobj({
                          ...registerobj,
                          firstname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group py-2">
                    <label>Cognome</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Inserisci cognome"
                      onChange={(e) =>
                        setRegisterobj({
                          ...registerobj,
                          lastname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group py-2">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Inserisci email"
                      onChange={(e) =>
                        setRegisterobj({
                          ...registerobj,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group py-2">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Inserisci password"
                      onChange={(e) => {
                        setRegisterobj({
                          ...registerobj,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="form-group py-2">
                    <label>Conferma password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Inserisci password"
                      onChange={(e) => {
                        console.log(e.target.value);
                        if (e.target.value === registerobj.password) {
                          setPasswordMatch(false);
                          setRegisterobj({
                            ...registerobj,
                            confirmpassword: e.target.value,
                          });
                        } else setPasswordMatch(true);
                      }}
                    />
                  </div>
                  <ErrorMessage
                    error="Le password non coincidono"
                    visible={passwordmatch}
                  />

                  <ErrorMessage
                    error="Inserisci tutti i campi"
                    visible={missingFieldsreg}
                  />

                  <button type="submit" className="text btn btn-dark">
                    Registrati
                  </button>
                </form>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
