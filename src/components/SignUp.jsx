import "./SignUpStyles.css"
import { Link, useNavigate } from 'react-router-dom';

import React,{useEffect} from 'react'
import { useSignUp,useIsAuthourized } from "../modules/auth"; 

const SignUp = () => {
    const { mutate, isError } = useSignUp()
    const isAuthourized = useIsAuthourized()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (isAuthourized) {
            navigate("/dashboard");
        }
    },[isAuthourized, navigate])
        
    function handleSignUp(event) {
        event.preventDefault();
        const form = document.getElementById("form-signup");
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const successMessage = document.getElementById("message");
        successMessage.style.display = "none";
        
        const mutation = mutate({
            email,
            password
        });
        
        if (mutation.data) {
            successMessage.style.color = "green";
            successMessage.style.display = "block";
            successMessage.innerText = "Sign up successful! Redirecting...";

            setTimeout(() => {
                form.reset();
                navigate("/auth/login");
            }, 2000);
        }
    }
        

        // if (localStorage.getItem(username)) {
        //     successMessage.style.color = "red";
        //     successMessage.style.display = "block";
        //     successMessage.innerText = "Username already exists. Please choose another one.";
        // } else {
        //     localStorage.setItem('username', username);
        //     localStorage.setItem('password', password);
            

        // }


    return (
        <div className="signup-form">
            <div className="header">
                <h2>Ticketed</h2>
            </div>
            <div className="form-header">
                <h2>Sign Up</h2>
                <p>Create your account by filling in the information below.</p>
            </div>
            <form id="form-signup" onSubmit={handleSignUp}>
                <div class="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required /><br /><br />
                </div>
                <div class="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required /><br /><br />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/auth/login" className="form-footer">Log in</a></p>
            <div id="message" className="message">Sign Up successful!</div>
            {isError && <p className="error-message">{ isError}</p>}
        </div>

    )
}

export default SignUp;



