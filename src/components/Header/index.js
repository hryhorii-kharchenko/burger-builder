import PropTypes from 'prop-types';
import React from 'react';

import Logo from '../Logo';
import Toolbar from '../Toolbar';
import ToolbarItem from '../ToolbarItem';

function Header() {
  return (
    <header>
      <Logo location="header" />
      <Toolbar location="header">
        <ToolbarItem title="Build your burger" link="/" />
      </Toolbar>
    </header>
  );
}

Header.propTypes = {};

export default Header;
