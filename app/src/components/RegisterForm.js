import React from 'react';
import "./RegisterForm.css"
import { TextField } from '@mui/material';
function RegisterForm() {
    return (
        <>
        {/* Login form */}
        <div class="registerForm">               
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
 
export default RegisterForm;