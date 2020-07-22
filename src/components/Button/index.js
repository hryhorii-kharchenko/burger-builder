import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function Button({
  id,
  onClick,
  color,
  className,
  isCustomStyled,
  isDisabled,
  children,
}) {
  const styleName = isCustomStyled ? null : 'button color-' + color;

  return (
    <button
      id={id}
      onClick={onClick}
      className={className}
      styleName={styleName}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  id: null,
  color: 'default',
  className: '',
  isCustomStyled: false,
  isDisabled: false,
};

Button.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  isCustomStyled: PropTypes.bool,
  isDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
