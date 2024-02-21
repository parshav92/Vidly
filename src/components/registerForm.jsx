import React from "react";
import "./loginForm.css";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import * as userService from "../services/userService";
import auth from "../services/authService";

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
  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
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
