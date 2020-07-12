import PropTypes from 'prop-types';
import React from 'react';

import Logo from '../Logo';
import Menu from '../Menu';
import MenuItem from '../MenuItem';

function Header() {
  return (
    <header>
      <Logo location="header" />
      <Menu location="header">
        <MenuItem title="Build your burger" link="/" />
      </Menu>
    </header>
  );
}

Header.propTypes = {};

export default Header;
