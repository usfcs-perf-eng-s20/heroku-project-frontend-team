const search_url = "https://perfeng-go-search.herokuapp.com/";
const analytics_url = "https://qa-analytics-boot.herokuapp.com";
const faves_url = "https://hist-fav-checkout.herokuapp.com";
const login_url = "https://perfeng-login-user.herokuapp.com/";

export const SEARCH_API = {
  ping: `${search_url}/`,
  search: `${search_url}/search`,
  getMovieById: `${search_url}/getMovieById`
};

export const ANALYTICS_API = {
  ping: `${analytics_url}/`
};

export const FAVES_API = {
  ping: `${faves_url}/ping`
};

export const LOGIN_API = {
  ping: `${login_url}/getUserInfo?userId=1`,
  getUserInfo: `${login_url}/getUserInfo`,
  login: `${login_url}/login`,
  logout: `${login_url}/logout`,
  isLoggedIn: `${login_url}/isLoggedIn`
};
