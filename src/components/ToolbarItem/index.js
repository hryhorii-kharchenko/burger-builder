import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function ToolbarItem({ title, link, isWhite, isActive, isVertical }) {
  const toolbarItemStyleName = 'toolbar-item ' + (isVertical ? 'vertical' : '');
  const linkStyleName =
    'link' + (isWhite ? ' color-white' : '') + (isActive ? ' active' : '');

  return (
    <li styleName={toolbarItemStyleName}>
      <a href={link} styleName={linkStyleName}>
        {title}
      </a>
    </li>
  );
}

ToolbarItem.defaultProps = {
  isWhite: false,
  isActive: false,
  isVertical: false,
};

ToolbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isWhite: PropTypes.bool,
  isActive: PropTypes.bool,
  isVertical: PropTypes.bool,
};

export default ToolbarItem;
