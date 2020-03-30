import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import axios from "axios";

import { LOGIN_API } from "constants/api_constants";
import useLocalStorage from "utils/useLocalStorage";

const initState = [undefined, false, null];

function postLoginUser({ email, password }) {
  return axios
    .post(LOGIN_API.login, { email, password })
    .then(({ data }) => ({ success: true, data }))
    .catch(err => ({ success: false, error: err }));
}

export default postLoginUser;
