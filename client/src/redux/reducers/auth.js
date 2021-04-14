import { AUTH, LOGOUT, GOOGLE_LOGIN } from '../constants/actionTypes';

const auth = (state = { authData: null, isLoggedIn: false }, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN:
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      return { ...state, authData: action.payload, isLoggedIn: true };
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.payload, isLoggedIn: true };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, isLoggedIn: false };
    default:
      return state;
  }
};

export default auth;
