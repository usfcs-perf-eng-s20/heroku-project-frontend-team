const cors_anywhere = "https://cors-anywhere.herokuapp.com";

const search_url = "https://perfeng-go-search.herokuapp.com";
const analytics_url = "https://qa-analytics-boot.herokuapp.com";
const faves_url = "https://hist-fav-checkout.herokuapp.com";
const login_url = "http://perfeng-login-user.herokuapp.com";

export const SEARCH_API = {
  ping: `${search_url}/`,
};

export const ANALYTICS_API = {
  ping: `${analytics_url}/`,
};

export const FAVES_API = {
  ping: `${faves_url}/ping`,
};

export const LOGIN_API = {
  ping: `${login_url}/`,
  getUserInfo: `${cors_anywhere}/${login_url}/getUserInfo`,
  login: `${login_url}/login`,
  logout: `${cors_anywhere}/${login_url}/logout`,
  isLoggedIn: `${cors_anywhere}/${login_url}/isLoggedIn`,
};
