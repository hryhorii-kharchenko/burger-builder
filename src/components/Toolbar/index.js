import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function Toolbar({ location, children }) {
  const styleName = 'toolbar location-' + location;

  return <ul styleName={styleName}>{children}</ul>;
}

Toolbar.propTypes = {
  location: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Toolbar;
