import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function IngredientMenuItem({ name, price, id, onClick }) {
  return (
    <li>
      <button
        styleName="button"
        onClick={() => onClick(id)}
      >{`${name} - ${price}`}</button>
    </li>
  );
}

IngredientMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientMenuItem;
