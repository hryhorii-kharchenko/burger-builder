import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Button({
  id,
  onClick,
  color,
  type,
  className,
  isCustomStyled,
  isDisabled,
  children,
  url,
  isOuterLink,
}) {
  const styleName = isCustomStyled ? null : 'button color-' + color;

  if (url) {
    return (
      <Link
        to={url}
        id={id}
        className={className}
        styleName={styleName}
        disabled={isDisabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
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
  type: 'button',
  className: '',
  isCustomStyled: false,
  isDisabled: false,
  url: '',
  isOuterLink: false,
};

Button.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  isCustomStyled: PropTypes.bool,
  isDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
  isOuterLink: PropTypes.bool,
};

export default Button;
