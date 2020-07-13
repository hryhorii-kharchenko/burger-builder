import PropTypes from 'prop-types';
import React from 'react';

function Menu({ location, children }) {
  return <ul>{children}</ul>;
}

Menu.propTypes = {
  location: PropTypes.string.isRequired,
  // children: PropTypes.arrayOf(PropTypes.element).isRequired,
  children: PropTypes.object.isRequired,
};

export default Menu;
