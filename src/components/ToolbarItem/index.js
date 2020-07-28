import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

function ToolbarItem({ title, link, isWhite, isActive, isVertical, onClick }) {
  const toolbarItemStyleName = 'toolbar-item ' + (isVertical ? 'vertical' : '');
  const linkStyleName = 'link' + (isWhite ? ' color-white' : ''); //+ (isActive ? ' active' : '');

  return (
    <li styleName={toolbarItemStyleName}>
      <NavLink
        to={link}
        exact
        styleName={linkStyleName}
        className="toolbar-item"
        onClick={onClick}
      >
        {title}
      </NavLink>
    </li>
  );
}

ToolbarItem.defaultProps = {
  isWhite: false,
  isActive: false,
  isVertical: false,
  onClick: null,
};

ToolbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isWhite: PropTypes.bool,
  isActive: PropTypes.bool,
  isVertical: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ToolbarItem;
