import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { Context } from "providers/Store.js";
import postLoginUser from "data/postLoginUser";

import "./Login.scss";

function Login() {
  const [{ isLoggedIn }, dispatch] = useContext(Context);

  const [email, setEmail] = useState("testaccount@gmail.com");
  const [password, setPassword] = useState("12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = () => {
    setLoading(true);
    postLoginUser({
      email,
      password
    }).then(result => {
      setLoading(false);
      if (result.success) {
        setError(null);
        dispatch({
          type: "SET_USERID",
          payload: result.data.userId
        });
      } else {
        console.log(result.error.response.data.error);
        setError(result.error.response.data.error);
      }
    });
  };

  if (isLoggedIn)
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );

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
          <div className="login_button" onClick={loginUser}>
            Login
          </div>
          <div
            className="login_bypass"
            onClick={() =>
              dispatch({
                type: "SET_BYPASS",
                payload: true
              })
            }
          >
            Login Bypass
          </div>
        </div>
        {loading && <div className="login_loading">Loading</div>}
        {error && <div className="login_error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
