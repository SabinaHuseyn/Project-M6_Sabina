import React from "react";
import styled from "styled-components";

const SearchPrice = ({ title, fromFunc, toFunc, from, to }) => {
  console.log('price');
  return (
    <Div>
      <p style={{ fontWeight: "bold", marginBottom: 0 }}>{title}</p>
      <Label>From</Label>
      <Input onChange={fromFunc} value={from} type="year" />
      <Label>to</Label>
      <Input onChange={toFunc} value={to} type="year" />
    </Div>
  );
};
const Div = styled.div`
  margin-left: -19px;
  margin-top: 26px;
`;
const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
`;
const Input = styled.input`
  width: 155px;
  height: 48px;
  font-size: 20px;
  padding: 15px;
  margin-top: 7px;
  border: 1px solid #000000;
  margin-right: 15px;
  margin-left: 8px;
`;

export default SearchPrice;
