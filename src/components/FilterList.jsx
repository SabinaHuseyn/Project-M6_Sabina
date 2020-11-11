import React from "react";
import ArrowDown from "../images/ArrowDown.png";

import styled from "styled-components";

const FilterList = ({ title, list, onChange, value, id }) => {
  console.log('Filter');
  return (
    <React.Fragment>
      <Label htmlFor={value}>{title}</Label>
      <FilterDiv>
        <Select onChange={onChange} id={id} value={value}>
          <option value=""></option>
          {list}
        </Select>
      </FilterDiv>
    </React.Fragment>
  )
};
const FilterDiv = styled.div`
  width: 374px;
  height: 48px;
  margin-top: 6px;
  position: relative;
`;
const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  margin-top: 27px;
`;
const Select = styled.select`
  background: url(${ArrowDown}) no-repeat 50%;
  background-position: center right 13px;
  width: 374px;
  height: 48px;
  font-size: 20px;
  border: 1px solid;
  left: -1px;
  position: absolute;
  padding: 10px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
export default FilterList;
