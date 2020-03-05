import React, { useState, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes";

import "./App.scss";

import useLoginStatus from "./provider/useLoginStatus";
import useLocalStorage from "./provider/useLocalStorage";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/";

function App() {
  const [username, setUsername] = useLocalStorage("username");
  const [password, setPassword] = useLocalStorage("password");
  const [bypass, setBypass] = useLocalStorage("bypass", false);

  const [isLoggedIn, loginLoading, loginError] = useLoginStatus({
    bypass
  });

  console.log(isLoggedIn, loginLoading, loginError);

  const showLoginPage =
    (!bypass && !(username || password)) || !isLoggedIn || loginError;

  const logoutCallback = useCallback(() => {
    setUsername("");
    setPassword("");
    setBypass(false);
  });

  return (
    <Router>
      {showLoginPage ? (
        <Login setBypass={setBypass} />
      ) : (
        <div>
          <NavBar logoutCallback={logoutCallback} />
          <Routes />
        </div>
      )}
    </Router>
  );
}

export default App;
