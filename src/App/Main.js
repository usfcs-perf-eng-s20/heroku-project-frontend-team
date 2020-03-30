import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
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

  // Retrieve from LocalStorage
  const [LSuserId, setLSUserId, deleteLSUserId] = useLocalStorage("userId");
  const [LSbypass, setLSBypass] = useLocalStorage("bypass");

  // Check if value already exists in LocalStorage, if so update store
  if (typeof userId === "undefined" && LSuserId) {
    dispatch({
      type: "SET_USERID",
      payload: LSuserId
    });
  }
  if (typeof bypass === "undefined" && typeof LSbypass !== "undefined") {
    dispatch({
      type: "SET_BYPASS",
      payload: LSbypass
    });
  }

  // Update local storage when store userId and bypass change. If userId is null, delete item from localStorage
  // TODO Review dependencies here (react-hooks/exhaustive-deps)
  useEffect(() => {
    if (isLoggedIn && userId !== LSuserId) setLSUserId(userId);
    else deleteLSUserId();
    if (bypass !== setLSBypass) setLSBypass(bypass);
  }, [userId, bypass]);

  // Retrieve login status
  const [loginStatusResult] = useLoginStatus();

  // Update login status on store
  useEffect(() => {
    if (loginStatusResult !== isLoggedIn)
      dispatch({
        type: "SET_ISLOGGEDIN",
        payload: loginStatusResult
      });
  }, [loginStatusResult, dispatch, isLoggedIn]);

  return (
    <Router>
      <Debug />
      <NavBar />
      <Switch>
        {routes.map(route => {
          return <Route {...route} />;
        })}
      </Switch>
    </Router>
  );
}

export default Main;
