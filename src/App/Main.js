import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Debug from "./Debug/";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";
import MyTop from "./Pages/MyTop";
import Status from "./Pages/Status";

import { Context } from "providers/Store.js";
import useLoginStatus from "data/useLoginStatus";
import useLocalStorage from "utils/useLocalStorage";

import "./Main.scss";

const routes = [
  { component: Home, path: "/", exact: true },
  { component: Login, path: "/login", exact: true },
  { component: Product, path: "/product/:id" },
  { component: Profile, path: "/me" },
  { component: Search, path: "/search" },
  { component: MyTop, path: "/top" },
  { component: Status, path: "/status" }
];

function Main() {
  // Load Store
  const [{ userId, bypass, isLoggedIn }, dispatch] = useContext(Context);
  console.log("useContext", userId, bypass, isLoggedIn);

  // Retrieve from LocalStorage
  const [LSuserId, setLSUserId, deleteLSUserId] = useLocalStorage("userId");
  const [LSbypass, setLSBypass] = useLocalStorage("bypass");

  useEffect(() => {
    if (LSuserId) {
      dispatch({
        type: "SET_USERID",
        payload: LSuserId
      });
    }
  }, [LSuserId]);

  useEffect(() => {
    if (LSbypass) {
      dispatch({
        type: "SET_BYPASS",
        payload: LSbypass
      });
    }
  }, [LSbypass]);

  useEffect(() => {
    setLSBypass(bypass);
  }, [bypass]);

  console.log("Local Storage", LSuserId, LSbypass);

  const [loginResult] = useLoginStatus();

  console.log("loginResult", loginResult);

  useEffect(() => {
    if (typeof loginResult === "undefined") return;

    if (loginResult) {
      setLSUserId(userId);
      dispatch({
        type: "LOGIN_USER"
      });
    } else {
      deleteLSUserId();
      dispatch({
        type: "LOGOUT_USER"
      });
    }
    console.log("newLoginResult");
  }, [loginResult]);

  return (
    <div className="main-container">
      <div className="main-content">
        <Router>
          <Debug />
          <Header />
          <Switch>
            {routes.map((route, index) => {
              return <Route key={index} {...route} />;
            })}
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default Main;
