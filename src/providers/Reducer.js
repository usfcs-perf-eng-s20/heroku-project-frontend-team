const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERID":
      return {
        ...state,
        userId: action.payload
      };
    case "SET_BYPASS":
      return {
        ...state,
        bypass: action.payload
      };
    case "SET_ISLOGGEDIN":
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case "SET_LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userId: undefined,
        bypass: false
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
