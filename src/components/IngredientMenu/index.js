import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import IngredientMenuItem from '../IngredientMenuItem';

function IngredientMenu({
  ingredients,
  totalPrice,
  addIngredientSelectedBurger,
}) {
  const menuItems = ingredients.map((ingredient) => (
    <IngredientMenuItem
      id={ingredient.id}
      name={ingredient.name}
      price={ingredient.price}
      onClick={addIngredientSelectedBurger}
    />
  ));

  return (
    <div styleName="ingredient-menu">
      <ul styleName="list">{menuItems}</ul>
      <p>
        Total price: <strong>{totalPrice}$</strong>
      </p>
    </div>
  );
}

IngredientMenu.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })
  ),
  totalPrice: PropTypes.number.isRequired,
  addIngredientSelectedBurger: PropTypes.func.isRequired,
};

export default IngredientMenu;
