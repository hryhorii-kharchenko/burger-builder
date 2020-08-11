import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import CloseButton from '../CloseButton';

function Ingredient({ type, removeIngredient }) {
  let name;

  switch (type) {
    case 'bread-top':
      name = 'Bread top';
      break;
    case 'meat':
      name = 'Meat';
      break;
    case 'cheese':
      name = 'Cheese';
      break;
    case 'salad':
      name = 'Salad';
      break;
    case 'bacon':
      name = 'Bacon';
      break;
    case 'bread-bottom':
      name = 'Bread bottom';
      break;

    default:
      name = null;
      break;
  }

  return name ? (
    <li styleName={'ingredient ' + type}>
      {name}
      <div styleName="delete-btn" onClick={removeIngredient}>
        <div styleName="delete-btn-div1" />
        <div styleName="delete-btn-div2" />
      </div>
    </li>
  ) : null;
}

Ingredient.propTypes = {
  type: PropTypes.string.isRequired,
  removeIngredient: PropTypes.func.isRequired,
};

export default Ingredient;
