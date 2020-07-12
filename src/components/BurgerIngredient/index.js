import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function BurgerIngredient({ type }) {
  return <div styleName={type} />;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
