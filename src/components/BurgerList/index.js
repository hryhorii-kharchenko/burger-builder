import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Burger from '../Burger';

function BurgerList({ burgers }) {
  const burgerElements = burgers.map((burgerIngredients) => (
    <Burger ingredientList={burgerIngredients} />
  ));

  return <section styleName="burger-list">{burgerElements}</section>;
}

BurgerList.propTypes = {
  burgers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default BurgerList;
