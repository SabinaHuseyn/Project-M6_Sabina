import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

const NavBar = ({ account }) => {
  return (
    <React.Fragment>
      <NavDiv>
        {!account && (
          <Div>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
          </Div>
        )}
        {account && (
          <Div>
            <StyledLink to="/logout">Logout</StyledLink>
            <StyledLink to="/profile">{account.name}</StyledLink>
          </Div>
        )}
      </NavDiv>
    </React.Fragment>
  );
};
const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const P = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 10px;
color: #B1ABAB;
`;
const Title = styled(NavLink)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 50px;
  margin-left: 52px;
  margin-top: 20px;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
`;
const StyledLink = styled(NavLink)`
  margin-right: 30px;
  text-decoration-line: none;
  cursor: pointer;
  color: #000000;
  &:hover{
  color: #833ae0;
  }`;
const Div = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  position:absolute;
  right:0;
  top:0;
  margin-top: 20px;
`;

export default NavBar;
