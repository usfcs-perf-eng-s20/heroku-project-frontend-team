import axios from "axios";

import { FAVES_API } from "constants/api_constants";

function postRateMovie({ userId, movieId, rating }) {
  return axios
    .post(FAVES_API.rateMovie, { userId, movieId, rating })
    .then(({ data }) => ({ success: true, data }))
    .catch(err => ({ success: false, error: err }));
}

export default postRateMovie;
