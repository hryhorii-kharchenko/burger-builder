import './style.module.css';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { logOut } from '../../actions';
import { getIsAuth } from '../../reducers/auth';
import Footer from '../Footer';
import Header from '../Header';
import SideDrawer from '../SideDrawer';

function Layout({ children, isAuth, logOut }) {
  const [isSideDrawerActive, setIsSideDrawerActive] = useState(false);

  return (
    <>
      <Header
        activateSideDrawer={() => setIsSideDrawerActive(true)}
        isAuth={isAuth}
        logOut={logOut}
      />
      <SideDrawer
        isActive={isSideDrawerActive}
        deactivate={() => setIsSideDrawerActive(false)}
        isAuth={isAuth}
        logOut={logOut}
      />

      <main styleName="main">{children}</main>

      <Footer isAuth={isAuth} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps, {
  logOut,
})(Layout);
