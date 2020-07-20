import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Footer from '../Footer';
import Header from '../Header';
import SideDrawer from '../SideDrawer';

function Layout({ children }) {
  const [isSideDrawerActive, setIsSideDrawerActive] = useState(false);

  return (
    <>
      <Header activateSideDrawer={() => setIsSideDrawerActive(true)} />
      <SideDrawer
        isActive={isSideDrawerActive}
        deactivate={() => setIsSideDrawerActive(false)}
      />

      <main>{children}</main>

      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
