import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import BurgerBuilder from './components/BurgerBuilder';
import Checkout from './components/Checkout';
import Layout from './components/Layout';
import Orders from './components/Orders';
import Spinner from './components/Spinner';
import ThankYou from './components/ThankYou';
import getPersistedStore from './configureStore';

const { store, persistor } = getPersistedStore();

function App() {
  return (
    <div id="application">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Spinner />}>
          <Router>
            <Layout>
              <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/thankyou" component={ThankYou} />
                <Route path="/orders" exact component={Orders} />
                <Route
                  render={() => (
                    <h1 style={{ textAlign: 'center' }}>
                      404 - Page Not Found
                    </h1>
                  )}
                />
              </Switch>
            </Layout>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
