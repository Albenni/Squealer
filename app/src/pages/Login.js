import React from "react";
import { Button, TextField } from "@mui/material";
import "./Login.css";
import LoginForm from "../components/LoginForm";

function Login() {
    
    return (

        <>
            <h1 className="loginTitle">Squeal</h1>
            <ul className="loginRegister">
                {/* Choice between login and register*/}
                <li><Button variant="text" className="selectLoginButton" size="large">LOGIN</Button></li>
                <li><Button variant="text" className="selectRegisterButton" size="large">REGISTER</Button></li>
            </ul>
            
        </>
    )

}

export default Login;