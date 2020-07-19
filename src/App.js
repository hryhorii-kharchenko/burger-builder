import React from 'react';

import BurgerBuilder from './components/BurgerBuilder';
import Layout from './components/Layout';

function App() {
  return (
    <div id="application">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
