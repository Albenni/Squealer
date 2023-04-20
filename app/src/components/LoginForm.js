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
            <TextField id="outlined-required" label="Username" variant="outlined" size="small" />
        </div>
        {/* Password input */}
        <div class="passwordInput">
            <TextField id="outlined-required" label="Password" variant="outlined" size="small" />
        </div>
        </form>
    
        </div>
        </>
    );
}
 
export default LoginForm;