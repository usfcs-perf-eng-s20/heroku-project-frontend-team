const search_url = "https://perfeng-go-search.herokuapp.com";
const analytics_url = "https://prod-analytics-boot.herokuapp.com";
const faves_url = "https://hist-fav-checkout.herokuapp.com";
const login_url = "https://gentle-spire-73113.herokuapp.com";

export const SEARCH_API = {
  ping: `${search_url}/`
};

export const ANALYTICS_API = {
  ping: `${analytics_url}/`
};

export const FAVES_API = {
  ping: `${faves_url}/ping`
};

export const LOGIN_API = {
  ping: `${login_url}/`,
  login: `${login_url}/login`
};
