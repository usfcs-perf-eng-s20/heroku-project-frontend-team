import React, { useState, useEffect, useContext } from "react";
import useAxios from "axios-hooks";
import axios from "axios";

import { LOGIN_API } from "constants/api_constants";
import { Context } from "providers/Store.js";

const initState = [undefined, false, null];

let flag = false;

function useLoginStatus() {
  const [loginState, setLoginState] = useState(initState);

  const [{ userId, bypass }, dispatch] = useContext(Context);

  useEffect(() => {
    console.log("Check Login Status", userId, bypass);
    if (bypass) return setLoginState([true, false, null]);

    if (!userId) return setLoginState([false, false, null]);

    setLoginState([undefined, true, null]);

    axios
      .get(LOGIN_API.isLoggedIn, { params: { userId } })
      .then(({ data }) => {
        setLoginState([data?.userLoggedIn, false, null]);
      })
      .catch(err => {
        setLoginState([false, false, err]);
      });
  }, [userId, bypass]);
  return loginState;
}

export default useLoginStatus;
