import uniqid from 'uniqid';

import axiosAuth from '../axios-auth';
import axiosOrders from '../axios-orders';
import {
  ADD_BURGER,
  ADD_BURGER_INGREDIENT,
  AUTH_END,
  AUTH_ERROR,
  AUTH_START,
  CHANGE_SELECTED_BURGER,
  CLEAR_BURGERS,
  LOG_IN,
  LOG_OUT,
  MOVE_BURGER_INGREDIENT,
  REMOVE_BURGER,
  REMOVE_BURGER_INGREDIENT,
  SET_BURGERS,
  SET_BURGER_INGREDIENTS,
  SORT_BURGER,
} from '../constants/actionTypes';
import defaultBurger from '../constants/defaultBurger';
import firebaseKey from '../constants/firebaseKey';
import { getBurgersFromJsonObj } from '../reducers/burgers';

export function addBurger(burgersLength) {
  return { type: ADD_BURGER, payload: burgersLength };
}

export function removeBurger(burgerIndex, burgersLength) {
  return { type: REMOVE_BURGER, payload: { burgerIndex, burgersLength } };
}

export function clearBurgers() {
  return { type: CLEAR_BURGERS };
}

export function setBurgers(burgers) {
  return { type: SET_BURGERS, payload: burgers };
}

export function sortBurger() {
  return {
    type: SORT_BURGER,
  };
}

export function setBurgerIngredients(burgerIndex, ingredients) {
  return {
    type: SET_BURGER_INGREDIENTS,
    payload: { burgerIndex, ingredients },
  };
}

export function addBurgerIngredient(burgerIndex, ingredientType) {
  const ingredient = {
    id: uniqid.time(ingredientType + '-'),
    ingredientId: ingredientType,
  };

  return {
    type: ADD_BURGER_INGREDIENT,
    payload: { burgerIndex, ingredient },
  };
}

export function removeBurgerIngredient(burgerIndex, ingredientIndex) {
  return {
    type: REMOVE_BURGER_INGREDIENT,
    payload: { burgerIndex, ingredientIndex },
  };
}

export function moveBurgerIngredient(burgerIndex, from, to) {
  return { type: MOVE_BURGER_INGREDIENT, payload: { burgerIndex, from, to } };
}

export function loadBurgersFromServer(
  url = '/burgers/default.json',
  callback = () => {}
) {
  return (dispatch) => {
    axiosOrders
      .get(url)
      .then((response) => getBurgersFromJsonObj(response.data))
      .then((burgers) => dispatch(setBurgers(burgers)))
      .then(() => callback())
      .catch((_error) => {
        dispatch(setBurgers(defaultBurger));
        callback();
      });
  };
}

export function changeSelectedBurger(index) {
  return {
    type: CHANGE_SELECTED_BURGER,
    payload: index,
  };
}

export function logIn(token, userId) {
  return {
    type: LOG_IN,
    payload: { token, userId },
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}

export function authStart() {
  return {
    type: AUTH_START,
  };
}

export function authEnd() {
  return {
    type: AUTH_END,
  };
}

export function authError(errorMsg) {
  const lowerCaseStr = errorMsg.toLowerCase().replace('_', ' ');
  const payload = lowerCaseStr[0].toUpperCase() + lowerCaseStr.slice(1);

  return {
    type: AUTH_ERROR,
    payload,
  };
}

export function signIn(_email, _password) {
  return (dispatch) => {
    auth(...arguments, '/accounts:signInWithPassword?key=', dispatch);
  };
}

export function signUp(_email, _password) {
  return (dispatch) => {
    auth(...arguments, '/accounts:signUp?key=', dispatch);
  };
}

function auth(email, password, authUrl, dispatch) {
  axiosAuth
    .post(authUrl + firebaseKey, {
      email,
      password,
      returnSecureToken: true,
    })
    .then((response) => {
      dispatch(logIn(response.data.idToken, response.data.localId));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(authError(error.response.data.error.message));
        return;
      }

      dispatch(authError(error.message));
    });
}
