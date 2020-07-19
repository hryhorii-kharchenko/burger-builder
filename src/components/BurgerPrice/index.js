import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function BurgerPrice({ price }) {
  return <p>{price.toFixed(2)} $</p>;
}

BurgerPrice.propTypes = {
  price: PropTypes.number,
};

export default BurgerPrice;
