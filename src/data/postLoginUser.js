import axios from "axios";

import { LOGIN_API } from "constants/api_constants";

function postLoginUser({ email, password }) {
  return axios
    .post(LOGIN_API.login, { email, password })
    .then(({ data }) => ({ success: true, data }))
    .catch(err => ({ success: false, error: err }));
}

export default postLoginUser;
