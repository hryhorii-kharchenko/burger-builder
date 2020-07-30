import arrayMove from 'array-move';

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
import { getMenuIngredientCssName, getMenuIngredientPrice } from './menu';

const initialState = [
  [
    { id: 'bread-top-00000001', ingredientId: 'breadTop' },
    { id: 'salad-00000002', ingredientId: 'salad' },
    { id: 'salad-00000003', ingredientId: 'salad' },
    { id: 'salad-00000004', ingredientId: 'salad' },
    { id: 'bread-bottom-00000005', ingredientId: 'breadBottom' },
  ],
];

export default function burgers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_BURGER:
      return state.concat([]);
    case REMOVE_BURGER:
      return state.filter((_burger, index) => index !== payload);
    case CLEAR_BURGER:
      return [];
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

export const getBurgerIngredientTuplesFromBurgers = (burgersRenderArr) =>
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

export const getBurgerIngredientTuplesFromBurgersObjArr = (burgersObjArr) =>
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

export function burgerSort(a, b) {
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
