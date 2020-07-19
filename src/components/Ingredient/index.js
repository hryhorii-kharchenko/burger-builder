import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function Ingredient({ type, onClick }) {
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
    <li styleName="ingredient" onClick={onClick}>
      {name}
    </li>
  ) : null;
}

Ingredient.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Ingredient;
