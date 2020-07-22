import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function Spinner({ isDisabled, className }) {
  return isDisabled ? null : (
    <div styleName="loader" className={className}>
      Loading...
    </div>
  );
}

Spinner.defaultProps = {
  isDisabled: false,
  className: null,
};

Spinner.propTypes = {
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Spinner;
