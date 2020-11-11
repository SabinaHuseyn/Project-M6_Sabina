import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

const PathToCoins = ({ title, pic, item }) => {
  return (
    <Div>
      <Title>{title}</Title>
      <StyledDiv
        to={{
          pathname: "/list",
          state: {
            name: item,
          },
        }}
      >
        Show all
      </StyledDiv>
      <IMG src={pic} alt={title} />
    </Div>
  );
};
const Div = styled.div`
  margin-top: 35px;
  margin-right: 170px;
  color: #000000;
  width: 262px;
`;
const IMG = styled.img`
  margin-top: 15px;
`;
const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  width: max-content;
`;
const StyledDiv = styled(NavLink)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
  &:hover{
  color: rgba(218, 137, 171, 0.829) ;
}`;

export default PathToCoins;
