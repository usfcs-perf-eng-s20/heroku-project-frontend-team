import axios from "axios";

import { FAVES_API } from "constants/api_constants";

function getUser({ userId }) {
  return axios
    .get(FAVES_API.user, {
      params: {
        userId,
      },
    })
    .then(({ data }) => ({ success: true, data }))
    .catch((err) => ({ success: false, error: err }));
}

export default getUser;
