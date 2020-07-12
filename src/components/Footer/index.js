import PropTypes from 'prop-types';
import React from 'react';

import Logo from '../Logo';
import Menu from '../Menu';
import MenuItem from '../MenuItem';

function Footer() {
  return (
    <footer>
      <Logo location="footer" />
      <Menu location="footer">
        <MenuItem title="Build your burger" link="/" />
      </Menu>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
