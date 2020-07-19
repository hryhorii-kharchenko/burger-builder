import PropTypes from 'prop-types';
import React from 'react';

function ToolbarItem({ title, link }) {
  return (
    <li>
      <a href={link}>{title}</a>
    </li>
  );
}

ToolbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ToolbarItem;
