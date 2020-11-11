import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import InputSearchHome from "./InputSearchHome.jsx";
import AdminNav from "./AdminNav.jsx";

import styled from "styled-components";

const CoinsList = ({ coins, location }) => {
  const { name, inputSearch, country, quality, metal, fromPrice, toPrice, fromYear, toYear } = location.state;
  const elements = coins.filter(coin => {
    if ((coin.country.includes(country)) ||
      (coin.composition.includes(metal)) ||
      (coin.quality.includes(quality)) ||
      (Number(coin.price) >= Number(fromPrice)) ||
      (Number(coin.price) <= Number(toPrice)) ||
      (Number(coin.year) >= Number(fromYear)) ||
      (Number(coin.year) <= Number(toYear)) ||
      (coin.name.includes(name)) || (coin.coins_type.includes(name)) || (coin.name.toLowerCase().includes(inputSearch)) ||
      (coin.shorttext.toLowerCase().includes(inputSearch)) || (coin.text.toLowerCase().includes(inputSearch))) {
      return coin;
    }
  }).map(elem => {
    return (
      <Div key={elem.id}>
        <IMG src={elem.avers_image} alt={elem.name} />
        <StyleDiv>
          <StyledName to={{
            pathname: "/details",
            state: {
              coin: elem,
            },
          }}>{elem.name}</StyledName>
          <div style={{ width: '240px' }}><Text>{elem.shorttext}</Text></div>
        </StyleDiv>
      </Div>
    );
  });
  return (
    <div>
      <AdminNav title="List of Coins" />
      <InputSearchHome />
      <MainDiv>{elements}</MainDiv>
    </div>
  )
};
const Div = styled.div`
  margin-bottom: -1px;
  margin-left: 52px;
  margin-right: 260px;
  width: max-content;
  color: #000000;
  padding-bottom: 5px;
`;
const MainDiv = styled.div`
 margin-top: 60px;
  column-count:2;
`;
const StyleDiv = styled.div`
  margin-left: 30px;
  display: inline-block;
  margin-top: initial;
  vertical-align: top;
`;
const IMG = styled.img`
  width: 120px;
  height: 120px;
`;
const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;
const StyledName = styled(NavLink)`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #833ae0;
  cursor: pointer;
  text-decoration: none;
  &:hover{
  color: rgba(218, 137, 171, 0.829) ;
}`;

export default CoinsList;
