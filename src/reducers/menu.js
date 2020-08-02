import {
  ADD_MENU_INGREDIENT,
  REMOVE_MENU_INGREDIENT,
} from '../constants/actionTypes';

const initialState = {
  breadTop: {
    id: 'breadTop',
    name: 'Bread top',
    cssName: 'bread-top',
    price: 0.25,
  },
  cheese: { id: 'cheese', name: 'Cheese', cssName: 'cheese', price: 0.99 },
  meat: { id: 'meat', name: 'Meat', cssName: 'meat', price: 1.99 },
  salad: { id: 'salad', name: 'Salad', cssName: 'salad', price: 0.3 },
  breadBottom: {
    id: 'breadBottom',
    name: 'Bread bottom',
    cssName: 'bread-bottom',
    price: 0.25,
  },
};

export default function menu(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case ADD_MENU_INGREDIENT:
    case REMOVE_MENU_INGREDIENT:
    default:
      return state;
  }
}

export const getMenu = (state) => state.menu;
export const getMenuIngredientPrice = (menu, id) => menu[id].price;
export const getMenuIngredientCssName = (menu, id) => menu[id].cssName;
export const getMenuValuesArr = (menu) => Object.values(menu);
