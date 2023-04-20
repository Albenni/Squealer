import React,{useState} from "react";
import { Button, TextField } from "@mui/material";
import "./Login.css";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
/* const setChoiceFunction = (choice) => {
        setChoice(choice);
    } */
function Login() {
    {/* State 0 equals login, state 1 equals register */}
    const [choice, setChoice] = useState(1);
    
    return (

        <>
            <h1 className="loginTitle">Squeal</h1>
            <ul className="loginRegister">
                {/* Choice between login and register*/}
                <li className="selectLoginElement"><Button variant="text" className="selectLoginButton" size="large" onClick={() => setChoice(1)}>LOGIN</Button></li>
                <li className="selectUsernameElement"><Button variant="text" className="selectRegisterButton" size="large" onClick={() => setChoice(0)}>REGISTER</Button></li>
            </ul>

            {
                
                choice ? <LoginForm className="loginForm"/> : <RegisterForm className="registerForm"/>
            } 
            
            
        </>
    )

}

export default Login;