import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import CheckoutForm from '../CheckoutForm';
import IngredientSummary from '../IngredientSummary';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    let burgers = [];
    const burgersJson = localStorage.getItem('burgers');
    if (burgersJson !== null) {
      burgers = JSON.parse(burgersJson);
    }

    let prices = [];
    const pricesJson = localStorage.getItem('prices');
    if (pricesJson !== null) {
      prices = JSON.parse(pricesJson);
    }

    this.state = {
      burgers,
      prices,
    };
  }

  render() {
    const { burgers, prices } = this.state;

    return (
      <>
        <section styleName="checkout">
          <h1>Checkout</h1>
          <section styleName="wrapper">
            <CheckoutForm burgers={burgers} prices={prices} />
            <IngredientSummary burgers={burgers} prices={prices} />
          </section>
        </section>
      </>
    );
  }
}

Checkout.propTypes = {};

export default Checkout;
