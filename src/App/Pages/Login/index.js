import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { Context } from "providers/Store.js";
import postLoginUser from "data/postLoginUser";

import "./Login.scss";

function Login() {
  const [{ isLoggedIn }, dispatch] = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = () => {
    setLoading(true);
    postLoginUser({
      email,
      password,
    }).then((result) => {
      setLoading(false);
      if (result.success) {
        setError(null);
        dispatch({
          type: "SET_USERID",
          payload: result.data.userId,
        });
      } else {
        setError("Error");
      }
    });
  };

  if (isLoggedIn)
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );

  return (
    <div className="login_main">
      <div className="login_container">
        <div className="title">Welcome to DVD Rentalz</div>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="row">
            <label>Email:</label>
            <input
              data-test-id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="row">
            <label>Password:</label>
            <input
              data-test-id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="buttons">
            <button
              data-test-id="login_button"
              className="login_button"
              onClick={loginUser}
              type="submit"
            >
              Login
            </button>
            <div
              data-test-id="login_bypass"
              className="login_bypass"
              onClick={() =>
                dispatch({
                  type: "SET_BYPASS",
                  payload: true,
                })
              }
            >
              Login Bypass
            </div>
          </div>
        </form>
        {loading && <div className="login_loading">Loading</div>}
        {error && <div className="login_error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
