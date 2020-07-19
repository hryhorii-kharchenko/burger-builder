import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import BurgerIngredient from '../BurgerIngredient';

function Burger({ ingredientList }) {
  if (ingredientList.length === 0) {
    return <p styleName="burger">Please, add the ingredients</p>;
  }

  const ingredients = ingredientList.map((ingredient) => (
    <BurgerIngredient type={ingredient.slice(0, -9)} key={ingredient} />
  ));

  return <article styleName="burger">{ingredients}</article>;
}

Burger.defaultProps = { ingredientList: [] };

Burger.propTypes = {
  ingredientList: PropTypes.arrayOf(PropTypes.string),
};

export default Burger;