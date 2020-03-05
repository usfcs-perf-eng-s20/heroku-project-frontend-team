import React from "react";

import "./Login.scss";

import useLocalStorage from "../../provider/useLocalStorage";

function Login({ setBypass }) {
  const [username, setUsername] = useLocalStorage("username");
  const [password, setPassword] = useLocalStorage("password");

  return (
    <div className="login_main">
      <div className="login_container">
        <div>
          <label>Username:</label>{" "}
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>{" "}
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div onClick={() => setBypass(true)}>Login</div>
      </div>
    </div>
  );
}

export default Login;
