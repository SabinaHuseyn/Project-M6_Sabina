import React from "react";
import { NavLink } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./Form.jsx";
import auth from "../services/logService.js";
import AdminNav from "./AdminNav.jsx";

import styled from "styled-components";

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  }
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  }
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    };
  };
  render() {
    return (
      <React.Fragment>
        <AdminNav title="User Profile" />
        <Div>
          <FormInput onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </FormInput>
          <Title to="/register">Register</Title>
        </Div>
      </React.Fragment>
    );
  }
}
const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 480px;
  position: absolute;
  top: 30%;
`;
const FormInput = styled.form`
  text-align: left;
`;
const Title = styled(NavLink)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
  color: #833ae0;
  cursor: pointer;
  text-decoration: none;
  &:hover{
  color: rgba(218, 137, 171, 0.829) ;
}
`;
export default LoginForm;
