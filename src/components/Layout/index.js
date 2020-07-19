import PropTypes from 'prop-types';
import React from 'react';

import Backdrop from '../Backdrop';
import Footer from '../Footer';
import Header from '../Header';
import SideDrawer from '../SideDrawer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <SideDrawer />
      <Backdrop />

      <main>{children}</main>

      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
