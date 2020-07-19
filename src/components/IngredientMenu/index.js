import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import IngredientMenuItem from '../IngredientMenuItem';

function IngredientMenu({ ingredients, addIngredientSelectedBurger }) {
  const menuItems = ingredients.map((ingredient) => (
    <IngredientMenuItem
      id={ingredient.id}
      name={ingredient.name}
      price={ingredient.price}
      onClick={addIngredientSelectedBurger}
    />
  ));

  return <ul styleName="ingredient-menu">{menuItems}</ul>;
}

IngredientMenu.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })
  ),
  addIngredientSelectedBurger: PropTypes.func.isRequired,
};

export default IngredientMenu;
