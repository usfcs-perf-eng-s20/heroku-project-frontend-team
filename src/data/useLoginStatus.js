import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { LOGIN_API } from "constants/api_constants";
import { Context } from "providers/Store.js";

const initState = [undefined, undefined, null];

function useLoginStatus() {
  const [loginState, setLoginState] = useState(initState);

  const [{ userId, bypass }] = useContext(Context);

  useEffect(() => {
    console.log("Check Login Status", userId, bypass);
    if (bypass) return setLoginState([true, false, null]);

    if (!userId) return setLoginState([undefined, false, null]);

    setLoginState([undefined, true, null]);

    axios
      .get(LOGIN_API.isLoggedIn, { params: { userId } })
      .then(({ data }) => {
        setLoginState([data?.userLoggedIn, false, null]);
      })
      .catch((err) => {
        setLoginState([false, false, err]);
      });
  }, [userId, bypass]);

  return loginState;
}

export default useLoginStatus;
