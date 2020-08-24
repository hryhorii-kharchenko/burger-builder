import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

function ToolbarItem({
  title,
  link,
  isWhite,
  // isActive,
  isVertical,
  onClick,
  isButton,
}) {
  const toolbarItemStyleName = 'toolbar-item ' + (isVertical ? 'vertical' : '');
  const linkStyleName = 'link' + (isWhite ? ' color-white' : ''); //+ (isActive ? ' active' : '');

  const item = isButton ? (
    <button styleName={linkStyleName} onClick={onClick}>
      {title}
    </button>
  ) : (
    <NavLink
      to={link}
      exact
      styleName={linkStyleName}
      className="toolbar-item"
      onClick={onClick}
    >
      {title}
    </NavLink>
  );

  return <li styleName={toolbarItemStyleName}>{item}</li>;
}

ToolbarItem.defaultProps = {
  link: '',
  isWhite: false,
  // isActive: false,
  isVertical: false,
  onClick: null,
  isButton: false,
};

ToolbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  isWhite: PropTypes.bool,
  // isActive: PropTypes.bool,
  isVertical: PropTypes.bool,
  onClick: PropTypes.func,
  isButton: PropTypes.bool,
};

export default ToolbarItem;
