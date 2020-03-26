import React, { useState, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes";

import "./App.scss";

import useLoginStatus from "./provider/useLoginStatus";
import useLocalStorage from "./provider/useLocalStorage";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/";

function App() {
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [bypass, setBypass] = useLocalStorage("bypass", false);
  const [refetch, setRefetch] = useState(false);

  const relogin = () => setRefetch(!refetch);

  const [isLoggedIn, loginLoading, loginError] = useLoginStatus({
    email,
    password,
    bypass,
    refetch
  });

  const showLoginPage =
    !bypass && (!(email || password) || !isLoggedIn || loginError);

  const logoutCallback = useCallback(() => {
    setEmail("");
    setPassword("");
    setBypass(false);
    relogin();
  });

  const loginProps = {
    setBypass,
    email,
    setEmail,
    password,
    setPassword,
    fetch: relogin,
    loginError
  };

  return (
    <Router>
      {showLoginPage ? (
        <Login {...loginProps} />
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
