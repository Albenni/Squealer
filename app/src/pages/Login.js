import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, TextField } from "@mui/material";
import LoginRegisMenu from "../components/LoginRegisMenu";
import "./Login.css";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const uriApi = "http://localhost:3500/auth";

  function submitForm() {
    axios
      .post(uriApi, {
        user: username,
        pwd: password,
      })
      .then((res) => {
        alert(res.statusText);
        setToken(res.data.accessToken);
        navigate("../");
      })
      .catch((err) => {
        //qua bisogna gestire gli errori in una maniera un po più carina
        if (err.response.status === 400)
          alert("username e password sono obbligatori");
        else if (err.response.status === 401)
          alert("username e password sbagliati");
      });
  }

  return (
    <>
      <LoginRegisMenu />
      <div className="loginForm">
        <form>
          <div className="usernameInput">
            <TextField
              id="outlined-required"
              label="Username"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>

          <div className="passwordInput">
            <TextField
              id="outlined-required"
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <Button variant="contained" onClick={submitForm}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
