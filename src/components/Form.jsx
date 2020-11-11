import React, { Component } from "react";
import Joi from "joi-browser";
import InputLogin from "./InputLogin.jsx";
import Select from "./Select.jsx";

import styled from "styled-components";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }
    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };
    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }
    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data, errors });
    };
    renderButton(label) {
        return (
            <Button disabled={this.validate()}>{label}</Button>
        );
    };
    renderInput(name, label, type = "text") {
        const { data, errors } = this.state;
        return (
            <InputLogin
                type={type}
                error={errors[name]}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange} />
        );
    };
    newCoin(name, label, type) {
        const { data, errors } = this.state;
        return (
            <React.Fragment>
                <Label htmlFor={name}>{label}</Label>
                <FilterDiv>
                    <InputCoin
                        type={type}
                        name={name}
                        id={name}
                        value={data[name]}
                        onChange={this.handleChange}
                    />
                </FilterDiv>
                {errors[name] && <Error>{errors[name]}</Error>}
            </React.Fragment>
        );
    };
    inputText(name, label, rows, cols) {
        const { data, errors } = this.state;
        return (
            <React.Fragment>
                <Label htmlFor={name}>{label}</Label>
                <TextDiv>
                    <InputTextarea
                        name={name}
                        id={name}
                        value={data[name]}
                        onChange={this.handleChange}
                        rows={rows}
                        cols={cols}
                    ></InputTextarea>
                </TextDiv>
                {errors[name] && <Error>{errors[name]}</Error>}
            </React.Fragment>
        );
    };
    renderSelect(name, label, options) {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };
};
const FilterDiv = styled.div`
  width: 360px;
  height: 48px;
  margin-top: 10px;
  position: relative;
`;
const TextDiv = styled.div`
  width: 360px;
  height: 60px;
  margin-top: 28px;
  position: relative;
  margin-bottom: 15px;
`;
const Label = styled.label`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
`;
const Error = styled.div`
  border: 1px solid;
  background-color: pink;
  color: red;
  height: 48px;
  padding: 15px;
`;
const InputCoin = styled.input`
  width: 374px;
  height: 48px;
  font-size: 15px;
  border: 1px solid;
  left: -1px;
  position: absolute;
  padding: 10px;
`;
const InputTextarea = styled.textarea`
  width: 374px;
  font-size: 15px;
  border: 1px solid;
  left: -1px;
  position: absolute;
  padding: 10px;
  bottom: -15px;
`;
const Button = styled.button`
  width: 120px;
  font-size: 20px;
  height: 48px;
  margin-left: 122px;
  background: #833ae0;
  cursor: pointer;
  color: white;
  margin-top: 30px;
  &:hover{
  background: rgba(218, 137, 171, 0.829) ;
}`;
export default Form;
