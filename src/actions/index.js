import uniqid from 'uniqid';

import {
  ADD_BURGER,
  ADD_BURGER_INGREDIENT,
  CLEAR_BURGER,
  MOVE_BURGER_INGREDIENT,
  REMOVE_BURGER,
  REMOVE_BURGER_INGREDIENT,
  SET_BURGER_INGREDIENTS,
  SORT_BURGER,
} from '../constants/actiosTypes';

export function addBurger() {
  return { type: ADD_BURGER };
}

export function removeBurger(burgerIndex) {
  return { type: REMOVE_BURGER, payload: burgerIndex };
}

export function clearBurger() {
  return { type: CLEAR_BURGER };
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
