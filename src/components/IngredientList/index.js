import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Ingredient from '../Ingredient';

function IngredientList({ ingredients }) {
  const ingredientList = ingredients.map((ingredient) => (
    <Ingredient id={ingredient.id} name={ingredient.name} key={ingredient.id} />
  ));

  return <ul>{ingredientList}</ul>;
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default IngredientList;
