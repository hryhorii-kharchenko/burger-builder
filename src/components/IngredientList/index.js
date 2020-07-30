import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Ingredient from '../Ingredient';

function IngredientList({ ingredients, removeIngredient }) {
  const ingredientList = ingredients.map((ingredient, index) => (
    <Ingredient
      type={ingredient.type}
      onClick={() => removeIngredient(index)}
      key={ingredient.id}
    />
  ));

  return <ul styleName="ingredient-list">{ingredientList}</ul>;
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, type: PropTypes.string })
  ),
};

export default IngredientList;
