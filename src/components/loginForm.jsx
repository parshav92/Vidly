import React from "react";
import "./loginForm.css";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    //call server
    console.log("Form submitted");
  };

  render() {
    return (
      <div className="login-form-container">
        <div className="login-form-header">
          <h2>Login</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <small className="form-text text-muted">
            Enter your email address.
          </small>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <div className="login-form-footer">
          <p>
            Don't have an data? <Link to="/registerForm">Sign up</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default LoginForm;
