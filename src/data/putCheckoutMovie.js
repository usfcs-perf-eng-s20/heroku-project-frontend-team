import axios from "axios";

import { FAVES_API } from "constants/api_constants";

function putCheckoutMovie({ userId, movieId, rating }) {
  return axios
    .put(FAVES_API.checkoutMovie, { userId, movieId, rating })
    .then(({ data }) => ({ success: true, data }))
    .catch((err) => ({ success: false, error: err }));
}

export default putCheckoutMovie;
