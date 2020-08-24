import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  getBurgers,
  getBurgersIngredientTuplesFromBurgersObjArr,
  getBurgersObjArr,
  getBurgersPrices,
  getBurgersRenderArr,
  getIsBurgersEmpty,
  getTotalPriceFromPrices,
} from '../../reducers/burgers';
import { getMenu } from '../../reducers/menu';
import CheckoutForm from '../CheckoutForm';
import ContentWrapper from '../ContentWrapper';
import IngredientSummary from '../IngredientSummary';

class Checkout extends React.Component {
  render() {
    const {
      isBurgersEmpty,
      burgerObjArr,
      burgersIngredientTuples,
      prices,
      totalPrice,
    } = this.props;

    if (isBurgersEmpty || prices.length === 0 || totalPrice === 0)
      return <Redirect to="/" />;

    return (
      <>
        <ContentWrapper>
          <h1>Checkout</h1>
          <div styleName="wrapper">
            <CheckoutForm
              burgerObjArr={burgerObjArr}
              prices={prices}
              totalPrice={totalPrice}
            />
            <IngredientSummary
              burgersIngredientTuples={burgersIngredientTuples}
              prices={prices}
            />
          </div>
        </ContentWrapper>
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
    isBurgersEmpty: getIsBurgersEmpty(burgers),
    burgerObjArr,
    burgersIngredientTuples: getBurgersIngredientTuplesFromBurgersObjArr(
      burgerObjArr
    ),
    prices,
    totalPrice: getTotalPriceFromPrices(prices),
  };
};

export default connect(mapStateToProps)(Checkout);
