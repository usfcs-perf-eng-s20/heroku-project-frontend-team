import axios from "axios";

import { SEARCH_API } from "constants/api_constants";

function getSearch({ keyword }) {
  return axios
    .get(SEARCH_API.search, {
      params: {
        keyword
      }
    })
    .then(({ data }) => ({ success: true, data }))
    .catch(err => ({ success: false, error: err }));
}

export default getSearch;
