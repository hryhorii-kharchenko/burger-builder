import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function BurgerIngredient({ type }) {
  let ingredient;

  switch (type) {
    case 'bread-top':
      ingredient = (
        <div styleName="bread-top">
          <div styleName="seeds1"></div>
          <div styleName="seeds2"></div>
        </div>
      );
      break;
    case 'meat':
    case 'cheese':
    case 'salad':
    case 'bacon':
    case 'bread-bottom':
      ingredient = <div styleName={type} />;
      break;

    default:
      ingredient = null;
      break;
  }

  return ingredient;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
