import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import Logo from '../Logo';
import SideDrawerToggler from '../SideDrawerToggler';
import Toolbar from '../Toolbar';
import ToolbarItem from '../ToolbarItem';

function Header({ activateSideDrawer }) {
  return (
    <header styleName="header">
      <Logo location="header" />
      <Toolbar location="header">
        <ToolbarItem title="Build your burger" link="/" isActive />
        <ToolbarItem title="My orders" link="/orders" />
      </Toolbar>
      <SideDrawerToggler onClick={activateSideDrawer} />
    </header>
  );
}

Header.propTypes = {};

export default Header;
