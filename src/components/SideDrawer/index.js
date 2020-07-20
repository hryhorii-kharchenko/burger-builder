import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Backdrop from '../Backdrop';
import CloseButton from '../CloseButton';
import Logo from '../Logo';
import Toolbar from '../Toolbar';
import ToolbarItem from '../ToolbarItem';

function SideDrawer({ isActive, deactivate }) {
  const styleName = 'side-drawer' + (isActive ? ' active' : '');

  return (
    <>
      <section styleName={styleName}>
        <Logo location="side" />
        <Toolbar location="side">
          <ToolbarItem title="Build your burger" link="/" isActive isVertical />
          <ToolbarItem title="Checkout" link="/" isVertical />
        </Toolbar>
        <CloseButton onClick={deactivate} top="15px" right="15px" />
      </section>
      <Backdrop isActive={isActive} onClick={deactivate} />
    </>
  );
}

SideDrawer.defaultProps = {
  isActive: false,
};

SideDrawer.propTypes = { isActive: PropTypes.bool, deactivate: PropTypes.func };

export default SideDrawer;
