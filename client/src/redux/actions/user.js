import { LOGOUT, GOOGLE_LOGIN } from '../constants/actionTypes';
import * as api from '../../api/';

export const googleLogin = (data) => (dispatch) => {
  try {
    dispatch({ type: GOOGLE_LOGIN, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const userLogout = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
