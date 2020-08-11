import React from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import BurgerBuilder from './components/BurgerBuilder';
import Checkout from './components/Checkout';
import Layout from './components/Layout';
import Orders from './components/Orders';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ThankYou from './components/ThankYou';
import { getIsAuth } from './reducers/auth';

function App({ isAuth }) {
  const routes = isAuth ? (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/thankyou" component={ThankYou} />
      <Redirect to="/" />
      {/* <Route
        render={() => (
          <h1 style={{ textAlign: 'center' }}>404 - Page Not Found</h1>
        )}
      /> */}
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/thankyou" component={ThankYou} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div id="application" style={{ minHeight: '100vh', position: 'relative' }}>
      <Router>
        <Layout>{routes}</Layout>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps)(App);
