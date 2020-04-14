import axios from "axios";

import { FAVES_API } from "constants/api_constants";

function postFavoriteMovie({ userId, movieId, rating }) {
  return axios
    .post(FAVES_API.favoriteMovie, { userId, movieId, rating })
    .then(({ data }) => ({ success: true, data }))
    .catch(err => ({ success: false, error: err }));
}

export default postFavoriteMovie;
