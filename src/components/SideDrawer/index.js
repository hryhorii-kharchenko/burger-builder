import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Backdrop from '../Backdrop';
import CloseButton from '../CloseButton';
import Logo from '../Logo';
import Toolbar from '../Toolbar';
import ToolbarItem from '../ToolbarItem';

function SideDrawer({ isActive, deactivate, isAuth, logOut }) {
  const styleName = 'side-drawer' + (isActive ? ' active' : '');

  const authLinks = isAuth ? (
    <ToolbarItem title="Log out" onClick={logOut} isVertical isButton />
  ) : (
    <>
      <ToolbarItem
        title="Log in"
        link="/sign-in"
        isVertical
        onClick={deactivate}
      />
      <ToolbarItem
        title="Sign up"
        link="/sign-up"
        isVertical
        onClick={deactivate}
      />
    </>
  );

  return (
    <>
      <section styleName={styleName}>
        <Logo location="side" />
        <Toolbar location="side">
          <ToolbarItem
            title="Build your burger"
            link="/"
            isVertical
            onClick={deactivate}
          />
          {isAuth ? (
            <ToolbarItem
              title="My orders"
              link="/orders"
              isVertical
              onClick={deactivate}
            />
          ) : null}
          {authLinks}
        </Toolbar>
        <CloseButton onClick={deactivate} top="32px" right="20px" />
      </section>
      <Backdrop isActive={isActive} onClick={deactivate} />
    </>
  );
}

SideDrawer.defaultProps = {
  isActive: false,
  isAuth: false,
};

SideDrawer.propTypes = {
  isActive: PropTypes.bool,
  deactivate: PropTypes.func,
  isAuth: PropTypes.bool,
  logOut: PropTypes.func.isRequired,
};

export default SideDrawer;
