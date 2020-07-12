import React from 'react';
import PropTypes from 'prop-types';

function Backdrop({ zIndex, backgroundColor, opacity }) {
  return (
    <div
      style={{
        zIndex,
        backgroundColor,
        opacity,
      }}
    />
  );
}

Backdrop.defaultProps = {
  zIndex: '999',
  backgroundColor: '#000',
  opacity: '70%',
};

Backdrop.propTypes = {
  zIndex: PropTypes.string,
  backgroundColor: PropTypes.string,
  opacity: PropTypes.string,
};

export default Backdrop;
