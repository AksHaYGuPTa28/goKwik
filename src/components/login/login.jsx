import React, { useRef, useState } from "react";
import "./login.css";
import Logo from "../../assets/logo.png";
import Main from "../../assets/main.svg";
import { auth } from "../../firebaseConfig";


const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const SignUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  const SignIn = (e) => {
    console.log("I am hitted");
    e.preventDefault();
    auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-navbar">
          <img src={Logo} alt="goKwik" />
        </div>
        <div className="login-main">
          <div className="login-main-left">
            <img src={Main} alt="sideImage" />
          </div>
          <div className="login-main-right">
            <h1>Enter your details here!!</h1>
            <form className="login-form">
              <input
                className="login-form-input"
                ref={emailRef}
                type="text"
                placeholder="Email"
                required="required"
                name="Username"
              />
              <input
                className="login-form-input"
                ref={passwordRef}
                type="password"
                placeholder="Password"
                required="required"
              />
              <p className="warning-message">* Minimum password length: 6 characters</p>
              <button
                className="login-form-submit"
                type="submit"
                onClick={SignIn}
                id="submitBtn"
              > Sign In</button>
              <button
                className="login-form-submit"
                onClick={SignUp}
                id="submitBtn"
              >Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
