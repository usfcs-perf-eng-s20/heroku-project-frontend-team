import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import axios from "axios";

import { LOGIN_API } from "../provider/routes_constants";
import useLocalStorage from "../provider/useLocalStorage";

const initState = [null, false, null];

function useLoginStatus(args = {}) {
  const { bypass = false, refetch, email = "", password = "" } = args;
  const [loginState, setLoginState] = useState(initState);

  useEffect(() => {
    if (bypass) return setLoginState(["1", false, false]);

    if (!email || !password) return setLoginState([null, false, true]);

    setLoginState([null, true, null]); // Loading

    axios
      .post(`${LOGIN_API.login}`, { email, password })
      .then(res => {
        setLoginState([res, false, null]);
      })
      .catch(err => {
        setLoginState([null, false, err]);
      });
  }, [bypass, refetch]);
  return loginState;
}

export default useLoginStatus;
