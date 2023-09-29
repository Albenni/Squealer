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
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/feed";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {}, []);

  async function submitFormLogin(event) {
    event.preventDefault();

    authapi
      .postLogin({ user: username, pwd: password })
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
                    {/* <h3>Accedi</h3> */}
                    <ErrorMessage
                      error="Username o password non valida"
                      visible={loginFailed}
                    />
                    <label>Username</label>
                    <input
                      type="Username"
                      className="form-control"
                      placeholder="Inserisci username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-group py-2">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Inserisci password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p>
                    <Link to="NewPassword">Hai dimenticato la password</Link>?
                  </p>

                  <button type="submit" className="text btn btn-dark">
                    Accedi
                  </button>
                </form>
              </Tab>
              <Tab eventKey="registrati" title="Registrati">
                <form
                  className="text-align-center container"
                  // onSubmit={submitForm}
                >
                  <div className="form-group py-2">
                    {/* <ErrorMessage
                    error="Email o password non valida"
                    visible={loginFailed}
                  /> */}
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Inserisci email"
                      // onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-group py-2">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Inserisci password"
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group py-2">
                    <label>Conferma password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Inserisci password"
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p>
                    <Link to="NewPassword">Hai dimenticato la password</Link>?
                  </p>

                  <button type="submit" className="text btn btn-dark">
                    Accedi
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
