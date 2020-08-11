import uniqid from 'uniqid';

import {
  ADD_BURGER,
  CLEAR_BURGERS,
  REMOVE_BURGER,
  SET_BURGERS,
} from '../constants/actionTypes';

const initialState = [uniqid.time()];

export default function burgerIds(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_BURGER:
      return state.concat(uniqid.time());
    case REMOVE_BURGER:
      const { burgerIndex } = payload;
      return state.length > 1
        ? state.filter((_id, index) => index !== burgerIndex)
        : state;
    case CLEAR_BURGERS:
      return [uniqid.time()];
    case SET_BURGERS:
      return payload.map((burger) => uniqid.time());
    default:
      return state;
  }
}

export const getBurgerIds = (state) => state.burgerIds;
