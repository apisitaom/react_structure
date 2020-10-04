import { LOGIN_SUCCESS, LOGOUT_SUCESS, SET_USER_DATA } from "./types";

export const loginSuccess = (token) => (dispatch) => {
  dispatch({ type: LOGIN_SUCCESS, payload: token });
};

export const setUserData = (data) => (dispatch) => {
  dispatch({ type: SET_USER_DATA, payload: data });
};

export const logoutSucess = (data) => (dispatch) => {
  dispatch({ type: LOGOUT_SUCESS, payload: data });
};
