import React from "react";
import Joi from "joi-browser";
import Form from "./Form.jsx";
import AdminNav from "./AdminNav.jsx";
import * as userService from "../services/userService.js";
import auth from "../services/logService.js";

import styled from "styled-components";

class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", name: "" },
        errors: {}
    }
    schema = {
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name")
    }
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
            <React.Fragment>
                <AdminNav title="Register" />
                <Div>
                    <FormInput onSubmit={this.handleSubmit}>
                        {this.renderInput("username", "Username")}
                        {this.renderInput("password", "Password", "password")}
                        {this.renderInput("name", "Name")}
                        {this.renderButton("Register")}
                    </FormInput>
                </Div>
            </React.Fragment>
        );
    };
};

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

export default RegisterForm;
