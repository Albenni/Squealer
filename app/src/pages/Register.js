import "../css/Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

import { Button, TextField } from "@mui/material";
import LoginRegisMenu from "../components/LoginRegisMenu";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState("");

  const navigate = useNavigate();

  function submitForm() {
    if (verPassword !== password)
      alert("le password non corrispondono"); //si può fare più carino
    else {
      axios
        .post("/register", {
          firstname: name,
          surname: surname,
          user: username,
          pwd: password,
        })
        .then((res) => {
          //si può rendere più carino
          alert(res.statusText);
          navigate("../login"); //redirect to login
        })
        .catch((err) => {
          //qua bisogna gestire gli errori in una maniera un po più carina
          if (err.response.status === 400)
            alert("username, nome, cognome e password sono obbligatori");
          else if (err.response.status === 409)
            alert("username già utilizzato");
        });
    }
  }
  return (
    <>
      <LoginRegisMenu />
      <div className="registerForm">
        <form>
          <div className="nameInput">
            <TextField
              id="outlined-required"
              label="Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="surnameInput">
            <TextField
              id="outlined-required"
              label="Surname"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setSurname(e.target.value);
              }}
              required
            />
          </div>
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
          <div className="confirmPasswordInput">
            <TextField
              id="outlined-required"
              label="Confirm password"
              variant="outlined"
              size="small"
              type="password"
              onChange={(e) => {
                setVerPassword(e.target.value);
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

export default Register;
