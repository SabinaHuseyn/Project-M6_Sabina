import React from "react";
import styled from "styled-components";

import "../styles/Description.scss";

const CoinItem = ({ location, history }) => {
    const { coin } = location.state;
    console.log(coin);
    return (
        <Main>
            <div className="left">
                <img src={coin.revers_image} />
                <img src={coin.avers_image} />
            </div>
            <div className="right">
                <div className="right_top">
                    <h1>{coin.name}</h1>
                    <p>{coin.shorttext}</p>
                    <p>{coin.text}</p>
                </div>
                <div className="right_bottom">
                    <table>
                        <tbody>
                            <tr>
                                <td>Issuing Country</td>
                                <td>{coin.country}</td>
                            </tr>
                            <tr>
                                <td>Composition</td>
                                <td>{coin.composition}</td>
                            </tr>
                            <tr>
                                <td>Quality</td>
                                <td>{coin.quality}</td>
                            </tr>
                            <tr>
                                <td>Denomination</td>
                                <td>{coin.denomination}</td>
                            </tr>
                            <tr>
                                <td>Year</td>
                                <td>{coin.year}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{coin.weight}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{coin.price}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Div onClick={() => history.goBack()}>Back to the list </Div>
                </div>
            </div>
        </Main>
    );
};
const Div = styled.div`
text-decoration: solid;
position: absolute;
bottom: 80px;
font-size: 12px;
color: #000000;
cursor: pointer;
&:hover{
color: #833ae0;
}
`;
const Main = styled.div`
max-width: 920px;
min-width: 600px;
margin: 0 auto;
height: auto;
display: flex;
`;
export default CoinItem;
