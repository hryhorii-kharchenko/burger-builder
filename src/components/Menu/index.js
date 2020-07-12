import React from 'react';
import PropTypes from 'prop-types';

function Menu({ location, children }) {
  return <ul>{children}</ul>;
}

Menu.propTypes = {
  location: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Menu;
