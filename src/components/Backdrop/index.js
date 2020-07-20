import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function Backdrop({ onClick, isActive, zIndex, backgroundColor, opacity }) {
  const styleName = 'backdrop ' + (isActive ? 'active' : '');

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor,
        opacity: isActive ? opacity : '0%',
        zIndex: isActive ? zIndex : '-999',
        transition: isActive ? 'opacity 0.3s ease-in-out' : '',
        // display: isActive ? 'block' : 'none',
      }}
      styleName={styleName}
    />
  );
}

Backdrop.defaultProps = {
  isActive: false,
  zIndex: '999',
  backgroundColor: '#000',
  opacity: '70%',
};

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  zIndex: PropTypes.string,
  backgroundColor: PropTypes.string,
  opacity: PropTypes.string,
};

export default Backdrop;
