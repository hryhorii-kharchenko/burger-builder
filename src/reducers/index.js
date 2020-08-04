import { combineReducers } from 'redux';

import auth from './auth';
import burgers from './burgers';
import menu from './menu';
import selectedBurger from './selecterBurger';

export default combineReducers({ burgers, selectedBurger, menu, auth });
