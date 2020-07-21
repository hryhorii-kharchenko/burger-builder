import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function Spinner({ isDisabled }) {
  return isDisabled ? null : <div styleName="loader">Loading...</div>;
}

Spinner.defaultProps = {
  isDisabled: false,
};

Spinner.propTypes = {
  isDisabled: PropTypes.bool,
};

export default Spinner;
