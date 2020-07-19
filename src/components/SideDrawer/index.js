// import PropTypes from 'prop-types';

import React from 'react';

import Logo from '../Logo';
import Toolbar from '../Toolbar';
import ToolbarItem from '../ToolbarItem';

function SideDrawer() {
  return (
    <section>
      <Logo location="side" />
      <Toolbar location="side">
        <ToolbarItem title="Build your burger" link="/" />
      </Toolbar>
    </section>
  );
}

SideDrawer.propTypes = {};

export default SideDrawer;
