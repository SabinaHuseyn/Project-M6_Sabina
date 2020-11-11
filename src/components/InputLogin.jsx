import React from "react";
import styled from "styled-components";

const InputLogin = ({ name, label, error, ...rest }) => {
  return (
    <Div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...rest}
        name={name}
        id={name}
      />
      {error && <Error>{error}</Error>}
    </Div>
  );
};
const Error = styled.div`
  border: 1px solid;
  background-color: pink;
  color: red;
  height: 48px;
  padding: 15px;
`;
const Div = styled.div`
 display: flex;
 flex-direction: column;
`;
const Input = styled.input`
  width: 374px;
  height: 48px;
  font-size: 17px;
  padding: 15px;
  margin-top: 7px;
`;
const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  margin-top:10px;
`;
export default InputLogin;
