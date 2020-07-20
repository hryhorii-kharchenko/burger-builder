import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function CloseButton({ onClick, className, top, right, bottom, left }) {
  return (
    <div
      styleName="close-button"
      className={className}
      onClick={onClick}
      style={{
        top,
        right,
        bottom,
        left,
      }}
    >
      <div styleName="div1" />
      <div styleName="div2" />
    </div>
  );
}

CloseButton.defaultProps = {
  top: null,
  right: null,
  bottom: null,
  left: null,
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
};

export default CloseButton;
