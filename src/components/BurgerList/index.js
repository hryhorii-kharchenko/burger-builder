import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Burger from '../Burger';

function BurgerList({ burgers, isLoading }) {
  const burgerElements = burgers.map((burgerIngredients) => (
    <Burger ingredientList={burgerIngredients} isLoading={isLoading} />
  ));

  return <section styleName="burger-list">{burgerElements}</section>;
}

BurgerList.defaultProps = {
  isLoading: false,
};

BurgerList.propTypes = {
  isLoading: PropTypes.bool,
  burgers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, type: PropTypes.string })
    )
  ).isRequired,
};

export default BurgerList;
