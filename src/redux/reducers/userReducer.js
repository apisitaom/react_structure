import { LOGIN_SUCCESS, LOGOUT_SUCESS, SET_USER_DATA } from "../actions/types";
const initState = { token: "", userData: {} };

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    case LOGOUT_SUCESS:
      return initState;
    default:
      return state;
  }
};
