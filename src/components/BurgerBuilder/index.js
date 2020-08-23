import PropTypes from 'prop-types';
import React from 'react';
import AriaModal from 'react-aria-modal';
import { connect } from 'react-redux';

import {
  addBurger,
  addBurgerIngredient,
  changeSelectedBurger,
  clearBurgers,
  loadBurgersFromServer,
  moveBurgerIngredient,
  removeBurger,
  removeBurgerIngredient,
  setBurgerIngredients,
  sortBurger,
} from '../../actions';
import axios from '../../axios-orders';
import { getIsAuth } from '../../reducers/auth';
import { getBurgerIds } from '../../reducers/burgerIds';
import {
  getBurgers,
  getBurgersIngredientTuplesFromBurgers,
  getBurgersPrices,
  getBurgersRenderArr,
  getIsBurgersEmpty,
  getTotalPriceFromPrices,
} from '../../reducers/burgers';
import { getMenu, getMenuValuesArr } from '../../reducers/menu';
import { getSelectedBurger } from '../../reducers/selectedBurger';
import BurgerControls from '../BurgerControls';
import BurgerList from '../BurgerList';
import IngredientSummary from '../IngredientSummary';
import OrderSummary from '../OrderSummary';
import withAxiosErrorHandler from '../withAxiosErrorHandler';

class BurgerBuilder extends React.Component {
  state = {
    isCheckoutModalActive: false,
    isCheckoutRequestLoading: false,
    isBurgerContentLoading: true,
  };

  componentDidMount() {
    const { burgers, loadBurgersFromServer } = this.props;

    if (getIsBurgersEmpty(burgers)) {
      loadBurgersFromServer('/burgers/default.json', () =>
        this.setIsBurgerContentLoading(false)
      );
    } else {
      this.setIsBurgerContentLoading(false);
    }
  }

  activateCheckoutModal = () => {
    this.setState({
      isCheckoutModalActive: true,
    });
  };

  deactivateCheckoutModal = () => {
    this.setState({
      isCheckoutModalActive: false,
    });
  };

  setIsBurgerContentLoading = (value) => {
    this.setState({
      isBurgerContentLoading: value,
    });
  };

  render() {
    const {
      isCheckoutRequestLoading,
      isBurgerContentLoading,
      isCheckoutModalActive,
    } = this.state;

    const {
      isAuth,
      selectedBurger,
      burgersRenderArr,
      burgersIngredientTuples,
      prices,
      totalPrice,
      menuValues,
      addBurgerIngredient,
      removeBurgerIngredient,
      changeSelectedBurger,
      addBurger,
      removeBurger,
      sortBurger,
      burgerIds,
    } = this.props;

    const addIngredientToSelectedBurger = (ingredientType) =>
      addBurgerIngredient(selectedBurger, ingredientType);

    const modal = isCheckoutModalActive ? (
      <AriaModal
        titleText="Checkout"
        onExit={this.deactivateCheckoutModal}
        initialFocus="checkout-modal-order-summary-checkout-btn"
        applicationNode={document.getElementById('application')}
        underlayStyle={{ paddingTop: '2em' }}
      >
        <OrderSummary
          summary={
            <IngredientSummary
              burgersIngredientTuples={burgersIngredientTuples}
              prices={prices}
            />
          }
          totalPrice={totalPrice}
          cancelBtnClick={this.deactivateCheckoutModal}
          checkoutUrl={isAuth ? '/checkout' : '/sign-in?redirectToCheckout'}
          checkouBtntId="checkout-modal-order-summary-checkout-btn"
          isLoading={isCheckoutRequestLoading}
        />
      </AriaModal>
    ) : null;

    return (
      <>
        <BurgerList
          burgers={burgersRenderArr}
          burgerIds={burgerIds}
          isLoading={isBurgerContentLoading}
          selectedBurger={selectedBurger}
          changeSelectedBurger={changeSelectedBurger}
          addBurger={addBurger}
          removeBurger={removeBurger}
        />
        <BurgerControls
          burgers={burgersRenderArr}
          burgerIds={burgerIds}
          prices={prices}
          totalPrice={totalPrice}
          availableIngredients={menuValues}
          addBurger={addBurger}
          removeBurger={removeBurger}
          addIngredient={addBurgerIngredient}
          addIngredientSelectedBurger={addIngredientToSelectedBurger}
          removeIngredient={removeBurgerIngredient}
          sortBurger={sortBurger}
          activateCheckoutModal={this.activateCheckoutModal}
          isLoading={isBurgerContentLoading}
          selectedBurger={selectedBurger}
          changeSelectedBurger={changeSelectedBurger}
        />
        {modal}
      </>
    );
  }
}

BurgerBuilder.propTypes = {};

const mapStateToProps = (state) => {
  const burgers = getBurgers(state);
  const menu = getMenu(state);
  const isAuth = getIsAuth(state);

  const burgersRenderArr = getBurgersRenderArr(burgers, menu);
  const prices = getBurgersPrices(burgers, menu);

  return {
    burgers,
    menu,
    isAuth,
    selectedBurger: getSelectedBurger(state),
    burgersRenderArr,
    burgersIngredientTuples: getBurgersIngredientTuplesFromBurgers(
      burgersRenderArr
    ),
    prices,
    totalPrice: getTotalPriceFromPrices(prices),
    menuValues: getMenuValuesArr(menu),
    burgerIds: getBurgerIds(state),
  };
};

export default withAxiosErrorHandler(
  connect(mapStateToProps, {
    addBurger,
    addBurgerIngredient,
    changeSelectedBurger,
    clearBurgers,
    loadBurgersFromServer,
    moveBurgerIngredient,
    removeBurger,
    removeBurgerIngredient,
    setBurgerIngredients,
    sortBurger,
  })(BurgerBuilder),
  axios
);
