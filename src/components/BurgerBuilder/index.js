import PropTypes from 'prop-types';
import React from 'react';
import AriaModal from 'react-aria-modal';
import { connect } from 'react-redux';

import {
  addBurger,
  addBurgerIngredient,
  clearBurger,
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
  constructor(props) {
    super(props);

    this.state = {
      isCheckoutModalActive: false,
      isCheckoutRequestLoading: false,
      isBurgerContentLoading: true,
    };

    this.activateCheckoutModal = this.activateCheckoutModal.bind(this);
    this.deactivateCheckoutModal = this.deactivateCheckoutModal.bind(this);
  }

  componentDidMount() {
    const burgersJson = localStorage.getItem('burgers');
    if (burgersJson !== null) {
      const burgers = JSON.parse(burgersJson);
      this.setState({
        ...burgers,
        isBurgerContentLoading: false,
      });
      return;
    }

    axios
      .get('/ingredients.json')
      .then(
        (response) =>
          Object.entries(response.data).map(
            (tuple) => tuple[0] + '-' + tuple[1]
          )
        // .sort(burgerSort)
      )
      .catch((error) => {
        console.log(error);
        return ['bread-top-00000001', 'meat-00000003', 'bread-bottom-00000005'];
      })
      .then((ingredients) =>
        this.setState({
          0: [...ingredients],
          isBurgerContentLoading: false,
        })
      )
      .then(() => {
        this.persistState();
      })
      .catch((error) => console.log(error));
  }

  activateCheckoutModal() {
    this.setState({
      isCheckoutModalActive: true,
    });
  }

  deactivateCheckoutModal() {
    this.setState({
      isCheckoutModalActive: false,
    });
  }

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
    moveBurgerIngredient,
    removeBurger,
    removeBurgerIngredient,
    setBurgerIngredients,
    sortBurger,
  })(BurgerBuilder),
  axios
);
