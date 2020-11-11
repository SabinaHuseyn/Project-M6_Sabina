import React from "react";
import Joi from "joi-browser";
import Form from "./Form.jsx";
import * as coinService from "../services/coinService.js";
import AdminNav from "./AdminNav.jsx";

import styled from "styled-components";

class Profile extends Form {
    state = {
        data: { name: "", country: "", shortText: "", text: "", weight: "", metal: "", price: "", year: "", type: "" },
        types: [],
        errors: {}
    }
    schema = {
        name: Joi.string().required().label("Name"),
        country: Joi.string().required().label("Country"),
        shortText: Joi.string().max(100).required().label("ShortText"),
        text: Joi.string().max(300).required().label("Text"),
        weight: Joi.string().required().label("Weight"),
        metal: Joi.string().required().label("Metal"),
        price: Joi.string().required().label("Price"),
        year: Joi.number().required().label("Year"),
        type: Joi.string().required().label("Type")
    }
    doSubmit = async () => {
        try {
            const response = await coinService.saveCoin(this.state.data);
            this.props.history.push("/");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };
    render() {
        return (
            <React.Fragment>
                <AdminNav title="Add new Coin" />
                <form style={{ display: "flex", justifyContent: "space-evenly" }} onSubmit={this.handleSubmit}>
                    <Div>
                        {this.newCoin("name", "Name", "text")}
                        {this.newCoin("country", "Country", "text")}
                        {this.inputText("shortText", "Short description", "4")}
                        {this.inputText("text", "Text", "4")}
                    </Div>
                    <Div>
                        {this.newCoin("weight", "Weight", "text")}
                        {this.newCoin("metal", "Metal", "text")}
                        {this.newCoin("price", "Price", "text")}
                        {this.newCoin("year", "Year", "number")}
                        {this.renderSelect("type", "Type", ["bullion", "exclusive", "commemorative"])}
                    </Div>
                    <DivButton>
                        {this.renderButton("Save")}
                    </DivButton>
                </form>
            </React.Fragment>
        );
    };
};
const Div = styled.div`
  margin-left: 52px;
  margin-top: 27px;
`;
const DivButton = styled.div`
  margin-top: 180px;
`;
export default Profile;
