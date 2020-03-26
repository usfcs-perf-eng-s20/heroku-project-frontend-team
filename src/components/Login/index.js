import React from "react";

import "./Login.scss";

import useLocalStorage from "../../provider/useLocalStorage";

function Login({
  setBypass,
  email,
  setEmail,
  password,
  setPassword,
  fetch,
  loginError
}) {
  return (
    <div className="login_main">
      <div className="login_container">
        <div className="title">Welcome to DVD Rentalz</div>
        <div className="row">
          <label>Email:</label>
          <input
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className="row">
          <label>Password:</label>
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div className="buttons">
          <div className="login_button" onClick={() => fetch()}>
            Login
          </div>
          <div className="login_bypass" onClick={() => setBypass(true)}>
            Login Bypass
          </div>
        </div>
        <div className="login_error">{loginError?.message}</div>
      </div>
    </div>
  );
}

export default Login;
