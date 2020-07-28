import PropTypes from 'prop-types';
import React from 'react';
import AriaModal from 'react-aria-modal';
import uniqid from 'uniqid';

import axios from '../../axios-orders';
import Burger from '../Burger';
import BurgerControls from '../BurgerControls';
import BurgerIngredient from '../BurgerIngredient';
import BurgerList from '../BurgerList';
import IngredientSummary from '../IngredientSummary';
import OrderSummary from '../OrderSummary';
import Spinner from '../Spinner';
import withAxiosErrorHandler from '../withAxiosErrorHandler';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBurger: 0,
      length: 1,
      0: [],
      availableIngredients: [
        { name: 'Bread top', id: 'bread-top', price: 0.25 },
        { name: 'Cheese', id: 'cheese', price: 0.99 },
        { name: 'Meat', id: 'meat', price: 1.99 },
        { name: 'Salad', id: 'salad', price: 0.3 },
        { name: 'Bread bottom', id: 'bread-bottom', price: 0.25 },
      ],
      isCheckoutModalActive: false,
      isCheckoutRequestLoading: false,
      isBurgerContentLoading: true,
    };

    this.addBurger = this.addBurger.bind(this);
    this.removeBurger = this.removeBurger.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.addIngredientSelectedBurger = this.addIngredientSelectedBurger.bind(
      this
    );
    this.removeIngredient = this.removeIngredient.bind(this);
    this.activateCheckoutModal = this.activateCheckoutModal.bind(this);
    this.deactivateCheckoutModal = this.deactivateCheckoutModal.bind(this);
    this.persistState = this.persistState.bind(this);
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
      .then((response) =>
        Object.entries(response.data)
          .map((tuple) => tuple[0] + '-' + tuple[1])
          .sort(this.burgerSort)
      )
      .catch((error) => {
        console.log(error);
        return [
          'bread-top-00000001',
          // 'cheese-00000002',
          'meat-00000003',
          // 'salad-00000004',
          'bread-bottom-00000005',
        ];
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

  persistState() {
    const burgers = Array.from(this.state);
    const { availableIngredients } = this.state;

    const prices = burgers
      .map((burger) =>
        burger.reduce(
          (prev, current) =>
            prev +
            availableIngredients.find(
              (ingredient) => ingredient.id === current.slice(0, -9)
            ).price,
          0
        )
      )
      .map((price) => parseFloat(price.toFixed(2)));

    localStorage.setItem('burgers', JSON.stringify(burgers));
    localStorage.setItem('prices', JSON.stringify(prices));
  }

  persistStateDeferred() {
    setTimeout(this.persistState);
  }

  addBurger(ingredients = []) {
    this.setState((oldState) => {
      this.persistStateDeferred();

      return {
        length: oldState.length + 1,
        [oldState.length]: ingredients,
      };
    });
  }

  removeBurger(id) {
    if (id >= this.state.length) return false;

    this.setState((oldState) => {
      this.persistStateDeferred();

      const newState = { length: oldState.length - 1 };
      let count = id;

      while (count < oldState.length - 1) {
        newState[count] = oldState[count + 1];
        count += 1;
      }

      newState[count] = null;

      return newState;
    });

    return true;
  }

  addIngredient(burgerId, ingredientGenericId) {
    if (burgerId >= this.state.length) return false;
    const ingredientId = uniqid.time(ingredientGenericId + '-');

    this.setState((oldState) => {
      this.persistStateDeferred();

      return {
        [burgerId]: [...oldState[burgerId], ingredientId],
      };
    });
  }

  addIngredientSelectedBurger(ingredientGenericId) {
    const ingredientId = uniqid.time(ingredientGenericId + '-');

    this.setState((oldState) => {
      this.persistStateDeferred();

      const { selectedBurger } = oldState;
      return { [selectedBurger]: [...oldState[selectedBurger], ingredientId] };
    });
  }

  removeIngredient(burgerId) {
    return (ingredientId) => {
      if (burgerId >= this.state.length) return false;

      this.setState((oldState) => {
        this.persistStateDeferred();

        const newState = oldState[burgerId].filter(
          (ingredient) => ingredient !== ingredientId
        );

        return {
          [burgerId]: newState,
        };
      });
    };
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

  burgerSort(a, b) {
    const bareA = a.slice(0, -9);
    const bareB = b.slice(0, -9);

    let valueA, valueB;

    switch (bareA) {
      case 'bread-top':
        valueA = 0;
        break;
      case 'cheese':
        valueA = 50;
        break;
      case 'meat':
        valueA = 100;
        break;
      case 'salad':
        valueA = 150;
        break;
      case 'bread-bottom':
        valueA = 10000;
        break;
      default:
        valueA = -1;
    }

    switch (bareB) {
      case 'bread-top':
        valueB = 0;
        break;
      case 'cheese':
        valueB = 50;
        break;
      case 'meat':
        valueB = 100;
        break;
      case 'salad':
        valueB = 150;
        break;
      case 'bread-bottom':
        valueB = 10000;
        break;
      default:
        valueB = -1;
    }

    return valueA - valueB;
  }

  render() {
    const {
      availableIngredients,
      isCheckoutRequestLoading,
      isBurgerContentLoading,
    } = this.state;

    const burgers = Array.from(this.state);
    const prices = burgers
      .map((burger) =>
        burger.reduce(
          (prev, current) =>
            prev +
            availableIngredients.find(
              (ingredient) => ingredient.id === current.slice(0, -9)
            ).price,
          0
        )
      )
      .map((price) => parseFloat(price.toFixed(2)));
    const totalPrice = prices
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2);

    const modal = this.state.isCheckoutModalActive ? (
      <AriaModal
        titleText="Checkout"
        onExit={this.deactivateCheckoutModal}
        initialFocus="checkout-modal-order-summary-checkout-btn"
        applicationNode={document.getElementById('application')}
        underlayStyle={{ paddingTop: '2em' }}
      >
        <OrderSummary
          summary={<IngredientSummary burgers={burgers} prices={prices} />}
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
        <BurgerList burgers={burgers} isLoading={isBurgerContentLoading} />
        <BurgerControls
          burgers={burgers}
          prices={prices}
          totalPrice={totalPrice}
          availableIngredients={availableIngredients}
          addBurger={this.addBurger}
          removeBurger={this.removeBurger}
          addIngredient={this.addIngredient}
          addIngredientSelectedBurger={this.addIngredientSelectedBurger}
          removeIngredient={this.removeIngredient}
          activateCheckoutModal={this.activateCheckoutModal}
          isLoading={isBurgerContentLoading}
        />
        {modal}
      </>
    );
  }
}

BurgerBuilder.propTypes = {};

export default withAxiosErrorHandler(BurgerBuilder, axios);
