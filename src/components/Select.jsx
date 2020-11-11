import React from "react";
import ArrowDown from "../images/ArrowDown.png";

import styled from "styled-components";

const Select = ({ name, label, onChange, error, value }) => {
    return (
        <React.Fragment>
            <Label htmlFor={name}>{label}</Label>
            <FilterDiv>
                <SelectCoin name={name} id={name} value={value} onChange={onChange}>
                    <option value=""></option>
                    <option value="bullion">bullion</option>
                    <option value="exclusive">exclusive</option>
                    <option value="commemorative">commemorative</option>
                </SelectCoin>
                {error && <Error>{error}</Error>}
            </FilterDiv>
        </React.Fragment>
    );
};
const Error = styled.div`
  border: 1px solid;
  background-color: pink;
  color: red;
  height: 48px;
  padding: 15px;
`;
const FilterDiv = styled.div`
  width: 360px;
  height: 48px;
  margin-top: 22px;
  position: relative;
`;
const Label = styled.label`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
`;
const SelectCoin = styled.select`
  background: url(${ArrowDown}) no-repeat 50%;
  background-position: center right 13px;
  width: 374px;
  height: 48px;
  font-size: 15px;
  border: 1px solid;
  left: -1px;
  position: absolute;
  padding: 10px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
export default Select;
