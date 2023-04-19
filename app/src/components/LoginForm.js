import React from "react";
import "./LoginForm.css";

const LoginForm = () => {
    
    return (

        <div className="loginForm">
            <h1 className="loginTitle">Login</h1>
            <input className="loginInputUsername" type="text" placeholder="Username" />
            <input className="loginInputPassword" type="password" placeholder="Password" />
            
        </div>

    )

}

export default LoginForm;