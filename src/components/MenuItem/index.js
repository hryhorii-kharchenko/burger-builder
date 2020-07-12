import React from 'react';
import PropTypes from 'prop-types';

function MenuItem({ title, link }) {
  return (
    <li>
      <a href={link}>{title}</a>
    </li>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default MenuItem;
