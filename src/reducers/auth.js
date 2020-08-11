import {
  AUTH_END,
  AUTH_ERROR,
  AUTH_START,
  LOG_IN,
  LOG_OUT,
} from '../constants/actionTypes';

export const initialState = {
  token: '',
  userId: '',
  isAuth: false,
  errorMsg: '',
  loadedAt: '',
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN:
      const { token, userId } = payload;
      return {
        token,
        userId,
        isAuth: true,
        errorMsg: '',
        loadedAt: new Date().toJSON(),
      };
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
