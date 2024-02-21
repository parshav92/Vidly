import React from "react";
import "./loginForm.css";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = "/";
      console.log("Submitted");
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
