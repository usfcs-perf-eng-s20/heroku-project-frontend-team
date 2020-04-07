const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERID":
      return {
        ...state,
        userId: action.payload,
      };
    case "SET_BYPASS":
      return {
        ...state,
        bypass: action.payload,
      };
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isLoggedIn: false,
        userId: undefined,
        bypass: undefined,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
