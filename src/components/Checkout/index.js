import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  getBurgers,
  getBurgersIngredientTuplesFromBurgersObjArr,
  getBurgersObjArr,
  getBurgersPrices,
  getBurgersRenderArr,
  getTotalPriceFromPrices,
} from '../../reducers/burgers';
import { getMenu } from '../../reducers/menu';
import CheckoutForm from '../CheckoutForm';
import IngredientSummary from '../IngredientSummary';

class Checkout extends React.Component {
  render() {
    const {
      burgerObjArr,
      burgersIngredientTuples,
      prices,
      totalPrice,
    } = this.props;

    return (
      <>
        <section styleName="checkout">
          <h1>Checkout</h1>
          <section styleName="wrapper">
            <CheckoutForm
              burgerObjArr={burgerObjArr}
              prices={prices}
              totalPrice={totalPrice}
            />
            <IngredientSummary
              burgersIngredientTuples={burgersIngredientTuples}
              prices={prices}
            />
          </section>
        </section>
      </>
    );
  }
}

Checkout.propTypes = {};

const mapStateToProps = (state) => {
  const burgers = getBurgers(state);
  const menu = getMenu(state);

  const burgersRenderArr = getBurgersRenderArr(burgers, menu);
  const burgerObjArr = getBurgersObjArr(burgersRenderArr);
  const prices = getBurgersPrices(burgers, menu);

  return {
    burgerObjArr,
    burgersIngredientTuples: getBurgersIngredientTuplesFromBurgersObjArr(
      burgerObjArr
    ),
    prices,
    totalPrice: getTotalPriceFromPrices(prices),
  };
};

export default connect(mapStateToProps)(Checkout);
