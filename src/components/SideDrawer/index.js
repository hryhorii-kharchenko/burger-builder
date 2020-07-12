// import PropTypes from 'prop-types';

import React from 'react';

import Logo from '../Logo';
import Menu from '../Menu';
import MenuItem from '../MenuItem';

function SideDrawer() {
  return (
    <section>
      <Logo location="side" />
      <Menu location="side">
        <MenuItem title="Build your burger" link="/" />
      </Menu>
    </section>
  );
}

SideDrawer.propTypes = {};

export default SideDrawer;
