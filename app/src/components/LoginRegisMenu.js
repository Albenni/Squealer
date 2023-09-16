import React from "react";
import { Button } from "@mui/material";
import "../css/LoginRegisMenu.css";
import { Link } from "react-router-dom";

function LoginRegisMenu() {
  return (
    <>
      <Link to="/">
        <h1 className="loginTitle">Squeal</h1>
      </Link>
      <ul className="loginRegister">
        <li className="selectLoginElement">
          <Link to="/login">
            <Button variant="text" className="selectLoginButton" size="large">
              LOGIN
            </Button>
          </Link>
        </li>

        <li className="selectUsernameElement">
          <Link to="/register">
            <Button
              variant="text"
              className="selectRegisterButton"
              size="large"
            >
              REGISTER
            </Button>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default LoginRegisMenu;
