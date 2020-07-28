import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import BurgerBuilder from './components/BurgerBuilder';
import Checkout from './components/Checkout';
import Layout from './components/Layout';
import Orders from './components/Orders';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <div id="application">
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/thankyou" component={ThankYou} />
            <Route path="/orders" exact component={Orders} />
            <Route
              render={() => (
                <h1 style={{ textAlign: 'center' }}>404 - Page Not Found</h1>
              )}
            />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
