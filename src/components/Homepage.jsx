import React from "react";
import InputSearchHome from "./InputSearchHome.jsx";
import PathToCoins from "./PathToCoins.jsx";
import AdminNav from "./AdminNav.jsx";
import Bullion from "../images/Bullion.png";
import Exclusive from "../images/Exclusive.png";
import Commemorative from "../images/Commemorative.png";

import styled from "styled-components";

const Homepage = () => {
  return (
    <div>
      <AdminNav title="Homepage" />
      <InputSearchHome />
      <Div>
        <PathToCoins item="bullion" title="Bullion Coins" pic={Bullion} />
        <PathToCoins item="exclusive" title="Exclusive Coins" pic={Exclusive} />
        <PathToCoins item="commemorative" title="Commemorative Coins" pic={Commemorative} />
      </Div>
    </div>
  );
};
const Div = styled.div`
  margin-left: 52px;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
`;
export default Homepage;
