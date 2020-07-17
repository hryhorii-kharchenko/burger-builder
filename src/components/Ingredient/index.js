import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function Ingredient({ id, name }) {
  return <li>{name}</li>;
}

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Ingredient;
