import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function SideDrawerToggler({ onClick }) {
  return (
    <div onClick={onClick} styleName="side-drawer-toggler">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

SideDrawerToggler.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SideDrawerToggler;
