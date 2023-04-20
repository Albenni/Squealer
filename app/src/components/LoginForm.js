import React from 'react';
import "./LoginForm.css";
import { TextField } from '@mui/material';

function LoginForm() {
    return (
        <>
        {/* Login form */}
        <div class="loginForm">               
        <form>
        {/* Email input */}
        <div className="usernameInput">
            <TextField id="outlined-basic" label="Username" variant="outlined" />
        </div>
        {/* Password input */}
        <div class="passwordInput">
            <TextField id="outlined-basic" label="Password" variant="outlined" />
        </div>
        </form>
    
        </div>
        </>
    );
}
 
export default LoginForm;