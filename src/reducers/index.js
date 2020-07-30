import { combineReducers } from 'redux';

import burgers from './burgers';
import menu from './menu';
import selectedBurger from './selecterBurger';

export default combineReducers({ burgers, selectedBurger, menu });
