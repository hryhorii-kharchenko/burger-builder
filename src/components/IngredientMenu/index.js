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
      cssName={ingredient.cssName}
      onClick={addIngredientSelectedBurger}
      key={ingredient.id}
    />
  ));

  return (
    <div styleName="ingredient-menu">
      <h3 styleName="title">Menu</h3>
      <ul styleName="list">{menuItems}</ul>
    </div>
  );
}

IngredientMenu.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      cssName: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  addIngredientSelectedBurger: PropTypes.func.isRequired,
};

export default IngredientMenu;
