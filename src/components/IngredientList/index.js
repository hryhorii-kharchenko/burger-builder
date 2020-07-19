import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Ingredient from '../Ingredient';

function IngredientList({ ingredients, removeIngredient }) {
  const ingredientList = ingredients.map((ingredient) => (
    <Ingredient
      type={ingredient.slice(0, -9)}
      onClick={() => removeIngredient(ingredient)}
      key={ingredient}
    />
  ));

  return <ul styleName="ingredient-list">{ingredientList}</ul>;
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

export default IngredientList;
