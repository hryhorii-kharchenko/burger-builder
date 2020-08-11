import arrayMove from 'array-move';
import uniqid from 'uniqid';

import {
  ADD_BURGER,
  ADD_BURGER_INGREDIENT,
  CLEAR_BURGERS,
  MOVE_BURGER_INGREDIENT,
  REMOVE_BURGER,
  REMOVE_BURGER_INGREDIENT,
  SET_BURGERS,
  SET_BURGER_INGREDIENTS,
  SORT_BURGER,
} from '../constants/actionTypes';
import { getMenuIngredientCssName, getMenuIngredientPrice } from './menu';

const initialState = [[]];

export default function burgers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_BURGER:
      return state.concat([[]]);
    case REMOVE_BURGER:
      const { burgerIndex } = payload;
      return state.length > 1
        ? state.filter((_burger, index) => index !== burgerIndex)
        : state;
    case CLEAR_BURGERS:
      return [[]];
    case SET_BURGERS:
      return [...payload];
    case SORT_BURGER:
      return state.map((burger, index) =>
        index === payload ? [...burger].sort(burgerSort) : burger
      );
    case SET_BURGER_INGREDIENTS:
      return state.map((burger, index) =>
        index === payload.burgerIndex ? [...payload.ingredients] : burger
      );
    case ADD_BURGER_INGREDIENT:
      return state.map((burger, index) =>
        index === payload.burgerIndex ? [...burger, payload.ingredient] : burger
      );
    case REMOVE_BURGER_INGREDIENT:
      return state.map((burger, index) =>
        index === payload.burgerIndex
          ? burger.filter(
              (_ingredient, index) => index !== payload.ingredientIndex
            )
          : burger
      );
    case MOVE_BURGER_INGREDIENT:
      return state.map((burger, index) =>
        index === payload.burgerIndex
          ? arrayMove(burger, payload.from, payload.to)
          : burger
      );
    default:
      return state;
  }
}

export const getBurgers = (state) => state.burgers;

export const getBurgersFromJsonObj = (jsonObj) =>
  Array.from(jsonObj).map((burger) =>
    Array.from(burger).map((ingredient) => {
      ingredient.id = uniqid.time(ingredient.ingredientId + '-');
      return ingredient;
    })
  );

export const getIsBurgersEmpty = (burgers) =>
  burgers.length === 0 || burgers.every((burger) => burger.length === 0);

export const getBurgerIngredientId = (ingredient) => ingredient.ingredientId;

export const getBurgersRenderArr = (burgers, menu) =>
  burgers.map((burger) =>
    burger.map((ingredient) => ({
      id: ingredient.id,
      type: getMenuIngredientCssName(menu, ingredient.ingredientId),
    }))
  );

export const getBurgersObjArr = (burgersRenderArr) =>
  burgersRenderArr.map((burger) => {
    const burgerObj = {};

    for (const ingredient of burger) {
      const { type } = ingredient;

      if (burgerObj[type]) {
        burgerObj[type] += 1;
      } else {
        burgerObj[type] = 1;
      }
    }

    return burgerObj;
  });

export const getBurgersIngredientTuplesFromBurgers = (burgersRenderArr) =>
  burgersRenderArr.map((burger) => {
    return burger.reduce((prev, current) => {
      const { id, type } = current;
      const index = prev.findIndex((elem) => elem[0] === type);

      if (index < 0) {
        prev.push([type, 1, id]);
        return prev;
      } else {
        prev[index][1] += 1;
        return prev;
      }
    }, []);
  });

export const getBurgersIngredientTuplesFromBurgersObjArr = (burgersObjArr) =>
  burgersObjArr.map((burgerObj) => Object.entries(burgerObj));

export const getBurgerPrice = (burger, menu) =>
  parseFloat(
    burger
      .reduce(
        (prev, current) =>
          prev + getMenuIngredientPrice(menu, getBurgerIngredientId(current)),
        0
      )
      .toFixed(2)
  );

export const getBurgersPrices = (burgers, menu) =>
  burgers.map((burger) => getBurgerPrice(burger, menu));

export const getTotalPriceFromBurgers = (burgers, menu) =>
  parseFloat(
    getBurgersPrices(burgers, menu)
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2)
  );

export const getTotalPriceFromPrices = (prices) =>
  parseFloat(prices.reduce((prev, current) => prev + current, 0).toFixed(2));

export const getBurgersLength = (burgers) => burgers.length;

function burgerSort(a, b) {
  const bareA = a.slice(0, -9);
  const bareB = b.slice(0, -9);

  let valueA, valueB;

  switch (bareA) {
    case 'bread-top':
      valueA = 0;
      break;
    case 'cheese':
      valueA = 50;
      break;
    case 'meat':
      valueA = 100;
      break;
    case 'salad':
      valueA = 150;
      break;
    case 'bread-bottom':
      valueA = 10000;
      break;
    default:
      valueA = -1;
  }

  switch (bareB) {
    case 'bread-top':
      valueB = 0;
      break;
    case 'cheese':
      valueB = 50;
      break;
    case 'meat':
      valueB = 100;
      break;
    case 'salad':
      valueB = 150;
      break;
    case 'bread-bottom':
      valueB = 10000;
      break;
    default:
      valueB = -1;
  }

  return valueA - valueB;
}
