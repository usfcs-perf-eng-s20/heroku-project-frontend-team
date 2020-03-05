import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";

import { LOGIN_API } from "../provider/routes_constants";
import useLocalStorage from "../provider/useLocalStorage";

const initState = [null, false, null];

function useLoginStatus({ bypass }) {
  const [loginState, setLoginState] = useState(initState);

  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useLocalStorage("password", "");

  const [{ data, loading, error }] = useAxios({
    url: `${LOGIN_API.login}`,
    method: "POST",
    params: {
      userName: username,
      password
    }
  });

  useEffect(() => {
    if (bypass) return setLoginState(["1", false, false]);

    if (!username || !password) setLoginState([null, false, true]);

    if (loading) {
      setLoginState([null, true, null]);
    }

    if (!error && data) {
      setLoginState([data, false, null]);
    } else {
      setLoginState([null, false, error]);
    }
  }, [username, password, data, loading, error, bypass]);

  return loginState;
}

export default useLoginStatus;
