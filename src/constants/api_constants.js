const cors_anywhere = "https://cors-anywhere.herokuapp.com";

const search_url = "https://perfeng-search.herokuapp.com/";
const analytics_url = "https://qa-analytics-boot.herokuapp.com";
const faves_url = "https://hist-favs-checkout.herokuapp.com";
const login_url = "https://perfeng-login-user.herokuapp.com";

export const SEARCH_API = {
  ping: `${search_url}/`,
  search: `${search_url}/search`,
  getMovieById: `${search_url}/getMovieById`
};

export const ANALYTICS_API = {
  ping: `${analytics_url}/`
};

export const FAVES_API = {
  ping: `${faves_url}/ping`,
  // favoriteMovie: `${cors_anywhere}/${faves_url}/favoriteMovie`,
  // rateMovie: `${cors_anywhere}/${faves_url}/rateMovie`,
  // checkoutMovie: `${cors_anywhere}/${faves_url}/checkoutMovie`
  favoriteMovie: `${faves_url}/favoriteMovie`,
  rateMovie: `${faves_url}/rateMovie`,
  checkoutMovie: `${faves_url}/checkoutMovie`
};

export const LOGIN_API = {
  ping: `${login_url}/getUserInfo?userId=1`,
  getUserInfo: `${login_url}/getUserInfo`,
  login: `${login_url}/login`,
  logout: `${login_url}/logout`,
  isLoggedIn: `${login_url}/isLoggedIn`
};
