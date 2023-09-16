import "../css/Login.css";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";

import { Button, TextField } from "@mui/material";
import LoginRegisMenu from "../components/LoginRegisMenu";

const LOGIN_URL = "/auth";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitForm() {
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          user: username,
          pwd: password,
        },
        {
          // headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert(response.statusText);
      setAuth(response?.data?.accessToken);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response.status === 400)
        alert("username e password sono obbligatori");
      else if (err.response.status === 401)
        alert("username e password sbagliati");
    }
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
