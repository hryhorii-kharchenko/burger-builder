import uniqid from 'uniqid';

import axiosOrders from '../axios-orders';
import {
  ADD_BURGER,
  ADD_BURGER_INGREDIENT,
  CLEAR_BURGER,
  MOVE_BURGER_INGREDIENT,
  REMOVE_BURGER,
  REMOVE_BURGER_INGREDIENT,
  SET_BURGERS,
  SET_BURGER_INGREDIENTS,
  SORT_BURGER,
} from '../constants/actionTypes';
import defaultBurger from '../constants/defaultBurger';
import { getBurgersFromJsonObj } from '../reducers/burgers';

export function addBurger() {
  return { type: ADD_BURGER };
}

export function removeBurger(burgerIndex) {
  return { type: REMOVE_BURGER, payload: burgerIndex };
}

export function clearBurger() {
  return { type: CLEAR_BURGER };
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
