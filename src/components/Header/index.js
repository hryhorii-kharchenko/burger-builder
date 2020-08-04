import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import Logo from '../Logo';
import SideDrawerToggler from '../SideDrawerToggler';
import Toolbar from '../Toolbar';
import ToolbarItem from '../ToolbarItem';

function Header({ activateSideDrawer, isAuth, logOut }) {
  const authLinks = isAuth ? (
    <ToolbarItem title="Log out" onClick={logOut} isButton />
  ) : (
    <>
      <ToolbarItem title="Log in" link="/sign-in" />
      <ToolbarItem title="Sign up" link="/sign-up" />
    </>
  );

  return (
    <header styleName="header">
      <Logo location="header" />
      <Toolbar location="header">
        <ToolbarItem title="Build your burger" link="/" />
        {isAuth ? <ToolbarItem title="My orders" link="/orders" /> : null}
        {authLinks}
      </Toolbar>
      <SideDrawerToggler onClick={activateSideDrawer} />
    </header>
  );
}

Header.defaultProps = {
  isAuth: false,
};

Header.propTypes = {
  activateSideDrawer: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  logOut: PropTypes.func.isRequired,
};

export default Header;
