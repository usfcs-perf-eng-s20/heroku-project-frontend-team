import axios from "axios";

import { LOGIN_API } from "constants/api_constants";

function putSignup({ userName, email, age, city, password }) {
  return axios
    .put(LOGIN_API.signup, {
      userName,
      email,
      age,
      city,
      password,
    })
    .then(({ data }) => ({ success: true, data }))
    .catch((err) => ({ success: false, error: err }));
}

export default putSignup;
