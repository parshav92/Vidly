import React from "react";
import "./loginForm.css";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = () => {
    //call server
    console.log("Form submitted");
  };
  render() {
    return (
      <div className="login-form-container">
        <div className="login-form-header">
          <h2>Register</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <small className="form-text text-muted">
            Enter your email address.
          </small>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
        <div className="login-form-footer">
          <p>
            Already have an data? <Link to="/loginForm">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
