import { useLogin } from "../modules/auth";
import "./Login.css"
import { useIsAuthourized } from './../modules/auth';
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const { mutate, isError } = useLogin()
    const isAuthourized = useIsAuthourized()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (isAuthourized) {
           navigate("/Dashboard");
            
        }
    },[isAuthourized])
    
    function handleLogIn(event) {
        event.preventDefault();
        const form = document.getElementById("form-login");
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const successMessage = document.getElementById("message");
        successMessage.style.display = "none";

        const mutation = mutate({
            email,
            password
        })

        if (mutation?.data) {
            
            successMessage.style.color = "green";
            successMessage.style.display = "block";
            successMessage.innerText = "Log in successful! Redirecting...";

            setTimeout(() => {
                form.reset();
                window.location.href = "/Dashboard";
            }, 2000);
        }

        // if(localStorage.getItem(username) === password) {
        //     successMessage.style.color = "green";
        //     successMessage.style.display = "block";
        //     successMessage.innerText = "Log in successful! Redirecting...";

          
        // } 
        // else {
        //     successMessage.style.color = "red";
        //     successMessage.style.display = "block";
        //     successMessage.innerText = "Invalid username or password. Please try again.";
            
        // }

       
    }


  return (
      <div className="Login-form">
          <div className="header">
          <h2>Ticketed</h2>
          </div>
            <div className="form-header">
                <h2>Log in</h2>
                <p>Log in to your account by filling in the information below.</p>
            </div>
          <form id="form-login" onSubmit={handleLogIn}>
              
                <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required /><br /><br />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required /><br /><br />
                </div>
                <button type="submit">Login</button>
          </form>
          <p >Don't have an account? <Link to="/auth/signup" class="form-footer">Sign up</Link></p>
          <div id="message" className="message">Log in successful!</div>
          {isError && <p className="error-message">{ isError}</p>}
        </div>
  )
}

export default LogIn;