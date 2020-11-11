import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

const AdminNav = ({ title }) => {
  return (
    <React.Fragment>
      <NavDiv>
        <Title>{title}</Title>
      </NavDiv>
      <DivLink to="/home">Back to home</DivLink>
    </React.Fragment>
  );
};
const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 50px;
  margin-left: 52px;
  margin-top: 20px;
  cursor: pointer;
`;
const DivLink = styled(NavLink)`
font-size: 14px;
margin-left: 52px;
cursor: pointer;
color: #000000;
&:hover{
  color: rgba(218, 137, 171, 0.829) ;
}`;
export default AdminNav;
