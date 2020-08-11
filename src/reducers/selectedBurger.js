import {
  ADD_BURGER,
  CHANGE_SELECTED_BURGER,
  REMOVE_BURGER,
  SET_BURGERS,
} from '../constants/actionTypes';

const initialState = 0;

export default function selectedBurger(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_SELECTED_BURGER:
      return payload;
    case REMOVE_BURGER:
      const { burgerIndex, burgersLength } = payload;
      if (
        burgerIndex < state ||
        (burgersLength > 1 &&
          burgerIndex === state &&
          burgersLength - 1 === state)
      ) {
        return state - 1;
      } else {
        return state;
      }
    case ADD_BURGER:
      return payload;
    case SET_BURGERS:
      return initialState;
    default:
      return state;
  }
}

export const getSelectedBurger = (state) => state.selectedBurger;
