import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Logo from '../Logo';
import Toolbar from '../Toolbar';
import ToolbarItem from '../ToolbarItem';

function Footer({ isAuth }) {
  return (
    <footer styleName="footer">
      <Logo location="footer" />
      <Toolbar location="footer">
        <ToolbarItem title="Build your burger" link="/" />
        {isAuth ? <ToolbarItem title="My orders" link="/orders" /> : null}
      </Toolbar>
    </footer>
  );
}

Footer.defaultProps = { isAuth: false };

Footer.propTypes = { isAuth: PropTypes.bool };

export default Footer;
