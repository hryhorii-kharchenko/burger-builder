import PropTypes from 'prop-types';
import React from 'react';

function Toolbar({ location, children }) {
  return <ul>{children}</ul>;
}

Toolbar.propTypes = {
  location: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Toolbar;
