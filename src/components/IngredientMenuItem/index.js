import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function IngredientMenuItem({ name, price, id, cssName, onClick }) {
  const className = 'button ' + cssName;

  return (
    <li styleName="ingredient-menu-item">
      <button styleName={className} onClick={() => onClick(id)}>
        <p>{name}</p>
        <p>{`${price}$`}</p>
      </button>
    </li>
  );
}

IngredientMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  cssName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientMenuItem;
