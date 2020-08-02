import PropTypes from 'prop-types';
import React from 'react';
import AriaModal from 'react-aria-modal';
import { connect } from 'react-redux';

import {
  addBurger,
  addBurgerIngredient,
  clearBurger,
  loadBurgersFromServer,
  moveBurgerIngredient,
  removeBurger,
  removeBurgerIngredient,
  setBurgerIngredients,
  sortBurger,
} from '../../actions';
import axios from '../../axios-orders';
import {
  getBurgers,
  getBurgersIngredientTuplesFromBurgers,
  getBurgersPrices,
  getBurgersRenderArr,
  getIsBurgersEmpty,
  getTotalPriceFromPrices,
} from '../../reducers/burgers';
import { getMenu, getMenuValuesArr } from '../../reducers/menu';
import { getSelectedBurger } from '../../reducers/selecterBurger';
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
      burgers,
      selectedBurger,
      menu,
      addBurgerIngredient,
      removeBurgerIngredient,
    } = this.props;

    const burgersRenderArr = getBurgersRenderArr(burgers, menu);
    const burgersIngredientTuples = getBurgersIngredientTuplesFromBurgers(
      burgersRenderArr
    );
    const prices = getBurgersPrices(burgers, menu);
    const totalPrice = getTotalPriceFromPrices(prices);
    const menuValues = getMenuValuesArr(menu);
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
          checkoutUrl="/checkout"
          checkouBtntId="checkout-modal-order-summary-checkout-btn"
          isLoading={isCheckoutRequestLoading}
        />
      </AriaModal>
    ) : null;

    return (
      <>
        <BurgerList
          burgers={burgersRenderArr}
          isLoading={isBurgerContentLoading}
        />
        <BurgerControls
          burgers={burgersRenderArr}
          prices={prices}
          totalPrice={totalPrice}
          availableIngredients={menuValues}
          addBurger={() => null}
          removeBurger={() => null}
          addIngredient={addBurgerIngredient}
          addIngredientSelectedBurger={addIngredientToSelectedBurger}
          removeIngredient={removeBurgerIngredient}
          activateCheckoutModal={this.activateCheckoutModal}
          isLoading={isBurgerContentLoading}
        />
        {modal}
      </>
    );
  }
}

BurgerBuilder.propTypes = {};

const mapStateToProps = (state) => ({
  burgers: getBurgers(state),
  selectedBurger: getSelectedBurger(state),
  menu: getMenu(state),
});

export default withAxiosErrorHandler(
  connect(mapStateToProps, {
    addBurger,
    addBurgerIngredient,
    clearBurger,
    loadBurgersFromServer,
    moveBurgerIngredient,
    removeBurger,
    removeBurgerIngredient,
    setBurgerIngredients,
    sortBurger,
  })(BurgerBuilder),
  axios
);
