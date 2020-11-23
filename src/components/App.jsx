import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import _ from "lodash";
import axios from "axios";
import Homepage from "./Homepage.jsx";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import Logout from "./Logout.jsx";
import Profile from "./Profile.jsx";
import AdvancedFilter from "./AdvancedFilterPage.jsx";
import PathToCoins from "./PathToCoins.jsx";
import CoinItem from "./CoinItem.jsx";
import CoinsList from "./CoinsList.jsx";
import NavBar from "./NavBar.jsx";
import auth from "../services/logService.js";

// import "react-toastify/dist/ReactToastify.css";
import "react-toastify/scss/main.scss";
import "../styles/App.scss";

const App = () => {
  const [coin, setCoin] = useState([]);
  const [account, setAccount] = useState({});
  useEffect(() => {
    const account = auth.getCurrentUser();
    setAccount(account);
  }, []);
  useEffect(() => {
    const search = async () => {
      const result = await axios.get("http://localhost:3000/list");
      setCoin(result.data);
      console.log(result.data);
    };
    search();
  }, []);
  return (
    <div>
      <ToastContainer />
      <NavBar account={account} />
      <Switch>
        <Route path="/home" component={Homepage}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/register" component={RegisterForm}></Route>
        <Route path="/logout" component={Logout} />
        <Route path="/profile" component={Profile} />
        <Route path="/filter" component={AdvancedFilter}></Route>
        <Route path="/coins" component={PathToCoins}></Route>
        <Route
          path="/list"
          render={(props) => <CoinsList {...props} coins={coin} />}
        />
        <Route path="/details" component={CoinItem}></Route>
        <Redirect from="/" exact to="/home" />
      </Switch>
    </div>
  );
};

export default App;
