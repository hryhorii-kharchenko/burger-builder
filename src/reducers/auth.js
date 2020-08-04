import {
  AUTH_END,
  AUTH_ERROR,
  AUTH_START,
  LOG_IN,
  LOG_OUT,
  SET_LOGOUT_TIMEOUT,
} from '../constants/actionTypes';

const initialState = {
  token: '',
  userId: '',
  email: '',
  isAuth: false,
  errorMsg: '',
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN:
      const { token, userId } = payload;
      return { ...state, token, userId, isAuth: true, errorMsg: '' };
    case LOG_OUT:
      return initialState;
    case AUTH_START:
      return { ...state, errorMsg: '' };
    case AUTH_END:
      return { ...state, errorMsg: '' };
    case AUTH_ERROR:
      return { ...state, errorMsg: payload };
    default:
      return state;
  }
}

export const getToken = (state) => state.auth.token;
export const getUserId = (state) => state.auth.userId;
export const getIsAuth = (state) => state.auth.isAuth;
export const getErrorMsg = (state) => state.auth.errorMsg;
