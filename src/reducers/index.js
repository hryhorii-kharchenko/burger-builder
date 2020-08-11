import { combineReducers } from 'redux';

import auth from './auth';
import burgerIds from './burgerIds';
import burgers from './burgers';
import menu from './menu';
import selectedBurger from './selectedBurger';

export default combineReducers({
  burgers,
  selectedBurger,
  burgerIds,
  menu,
  auth,
});
