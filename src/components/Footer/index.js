import PropTypes from 'prop-types';
import React from 'react';

import Logo from '../Logo';
import Toolbar from '../Toolbar';
import ToolbarItem from '../ToolbarItem';

function Footer() {
  return (
    <footer>
      <Logo location="footer" />
      <Toolbar location="footer">
        <ToolbarItem title="Build your burger" link="/" />
      </Toolbar>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
