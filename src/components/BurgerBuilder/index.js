import PropTypes from 'prop-types';
import React from 'react';
import AriaModal from 'react-aria-modal';
import uniqid from 'uniqid';

import axios from '../../axios-orders';
import Burger from '../Burger';
import BurgerControls from '../BurgerControls';
import BurgerIngredient from '../BurgerIngredient';
import BurgerList from '../BurgerList';
import OrderSummary from '../OrderSummary';
import Spinner from '../Spinner';
import withAxiosErrorHandler from '../withAxiosErrorHandler';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBurger: 0,
      length: 1,
      0: [
        //   'bread-top-00000001',
        //   'cheese-00000002',
        //   'meat-00000003',
        //   'salad-00000004',
        //   'bread-bottom-00000005',
      ],
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
    this.proceedCheckout = this.proceedCheckout.bind(this);
  }

  componentDidMount() {
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
      .catch((error) => console.log(error));
  }

  addBurger(ingredients = []) {
    this.setState((oldState) => {
      return {
        length: oldState.length + 1,
        [oldState.length]: ingredients,
      };
    });
  }

  removeBurger(id) {
    if (id >= this.state.length) return false;

    this.setState((oldState) => {
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
      return {
        [burgerId]: [...oldState[burgerId], ingredientId],
      };
    });
  }

  addIngredientSelectedBurger(ingredientGenericId) {
    const ingredientId = uniqid.time(ingredientGenericId + '-');

    this.setState((oldState) => {
      const { selectedBurger } = oldState;
      return { [selectedBurger]: [...oldState[selectedBurger], ingredientId] };
    });
  }

  removeIngredient(burgerId) {
    return (ingredientId) => {
      if (burgerId >= this.state.length) return false;

      this.setState((oldState) => {
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

  proceedCheckout() {
    this.setState({
      isCheckoutRequestLoading: true,
    });

    const { availableIngredients } = this.state;
    const burgers = Array.from(this.state);
    const prices = burgers.map((burger) =>
      burger.reduce(
        (prev, current) =>
          prev +
          availableIngredients.find(
            (ingredient) => ingredient.id === current.slice(0, -9)
          ).price,
        0
      )
    );
    const totalPrice = parseFloat(
      prices.reduce((prev, current) => prev + current, 0).toFixed(2)
    );
    const burgerObjects = burgers.map((burger, index) => {
      const burgerObj = {};

      for (const ingredient of burger) {
        const bareIngredient = ingredient.slice(0, -9);

        if (burgerObj[bareIngredient]) {
          burgerObj[bareIngredient] += 1;
        } else {
          burgerObj[bareIngredient] = 1;
        }
      }
      burgerObj.price = prices[index];

      return burgerObj;
    });

    const orderInfo = {
      totalPrice,
      burgers: burgerObjects,
      customer: {
        name: 'Test Test',
        email: 'test@test.com',
        address: { adress1: 'street1', zipCode: 12345, country: 'USA' },
      },
      deliveryMethod: 'fastest',
    };

    axios
      .post('/orders.json', orderInfo)
      .then((response) => this.deactivateCheckoutModal())
      .catch((error) => console.log(error))
      .finally(() =>
        this.setState({
          isCheckoutRequestLoading: false,
        })
      );
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
    const prices = burgers.map((burger) =>
      burger.reduce(
        (prev, current) =>
          prev +
          availableIngredients.find(
            (ingredient) => ingredient.id === current.slice(0, -9)
          ).price,
        0
      )
    );
    const totalPrice = prices
      .reduce((prev, current) => prev + current, 0)
      .toFixed(2);
    const mergedBurgers = burgers.map((burger) => {
      return burger.reduce((prev, next) => {
        const bareIngredient = next.slice(0, -9);
        const index = prev.findIndex((elem) => elem[0] === bareIngredient);

        if (index < 0) {
          prev.push([bareIngredient, 1]);
          return prev;
        } else {
          prev[index][1] += 1;
          return prev;
        }
      }, []);
    });

    const orderSummary = mergedBurgers.map((burger, index) => (
      <article>
        <h3>Burger {index + 1}</h3>
        <ul>
          {burger.map((ingredient) => (
            <li>
              {ingredient[0]}: {ingredient[1]}
            </li>
          ))}
        </ul>
        <p>
          Price: <strong>{prices[index]}$</strong>
        </p>
      </article>
    ));

    const modal = this.state.isCheckoutModalActive ? (
      <AriaModal
        titleText="Checkout"
        onExit={this.deactivateCheckoutModal}
        initialFocus="checkout-modal-order-summary-checkout-btn"
        applicationNode={document.getElementById('application')}
        underlayStyle={{ paddingTop: '2em' }}
      >
        <OrderSummary
          summary={orderSummary}
          totalPrice={totalPrice}
          cancelBtnClick={this.deactivateCheckoutModal}
          checkoutBtnClick={this.proceedCheckout}
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
