import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import _ from 'lodash';
import ArrowDown from "../images/ArrowDown.png";

import styled, { keyframes } from "styled-components";

const InputSearchHome = ({ country, quality, metal, fromPrice, toPrice, fromYear, toYear }) => {
  const [search, setSearch] = useState(undefined);
  return (
    <Div>
      <Label>Input field</Label>
      <div>
        <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button to={{
          pathname: "/list",
          state: {
            inputSearch: search,
            country: country,
            quality: quality,
            metal: metal,
            fromPrice: fromPrice,
            toPrice: toPrice,
            fromYear: fromYear,
            toYear: toYear
          }
        }}>Search</Button>
      </div>
      <StyledLink to="/filter">
        Advanced filter<Span></Span>
      </StyledLink>
    </Div>
  );
};
const Div = styled.div`
  margin-left: 52px;
  margin-top: 27px;
`;
const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
`;
const Span = styled.span`
  background: url(${ArrowDown}) no-repeat 50%;
  height: 11px;
  width: 16px;
  margin-top: 9px;
`;
const Input = styled.input`
  width: 374px;
  height: 48px;
  font-size: 20px;
  padding: 15px;
  margin-top: 7px;
  border: 1px solid #000000;
`;
const Button = styled(NavLink)`
  width: 120px;
  height: 48px;
  text-align: center;
  vertical-align: middle;
  margin-top: -6px;
  text-decoration: none;
  padding: 14px;
  color: white;
  margin-left: 30px;
  background: #833ae0;
  cursor: pointer;
`;
const StyledLink = styled(NavLink)`
  font-family: Roboto;
  font-style: normal;
  text-decoration-line: underline;
  font-weight: 300;
  cursor: pointer;
  color: #000000;
`;

export default InputSearchHome;
