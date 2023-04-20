import React from 'react';
import "./RegisterForm.css"
import { TextField } from '@mui/material';
function RegisterForm() {
    return (
        <>
        {/* Login form */}
        <div class="registerForm">               
        <form>
        {/* Name input */}
        <div className="nameInput">
            <TextField id="outlined-required" label="Name" variant="outlined" size="small"/>
        </div>
        {/* Surname input */}
        <div className="surnameInput">
            <TextField id="outlined-required" label="Surname" variant="outlined" size="small"/>
        </div>
        {/* Email input */}
        <div className="usernameInput">
            <TextField id="outlined-required" label="Username" variant="outlined" size = "small"/>
        </div>
        {/* Password input */}
        <div class="passwordInput">
            <TextField id="outlined-required" label="Password" variant="outlined" size="small"/>
        </div>
        {/* Confirm password input */}
        <div class="confirmPasswordInput">
            <TextField id="outlined-required" label="Confirm password" variant="outlined" size="small"/>
        </div>
        </form>
        
        </div>
        </>
    );
}
 
export default RegisterForm;