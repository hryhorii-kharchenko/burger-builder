import PropTypes from 'prop-types';
import React from 'react';
import AriaModal from 'react-aria-modal';
import uniqid from 'uniqid';

import Burger from '../Burger';
import BurgerControls from '../BurgerControls';
import BurgerIngredient from '../BurgerIngredient';
import BurgerList from '../BurgerList';
import OrderSummary from '../OrderSummary';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBurger: 0,
      length: 1,
      0: [
        'bread-top-iob0ucot',
        'cheese-iob0ucor',
        'meat-iob0ucoe',
        'salad-iob0ucow',
        'bread-bottom-iob0ucoq',
      ],
      availableIngredients: [
        { name: 'Bread top', id: 'bread-top', price: 0.25 },
        { name: 'Cheese', id: 'cheese', price: 0.99 },
        { name: 'Meat', id: 'meat', price: 1.99 },
        { name: 'Salad', id: 'salad', price: 0.3 },
        { name: 'Bread bottom', id: 'bread-bottom', price: 0.25 },
      ],
      isCheckoutModalActive: false,
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

  render() {
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
          checkoutBtnClick={() => null}
          checkouBtntId="checkout-modal-order-summary-checkout-btn"
        />
      </AriaModal>
    ) : null;

    return (
      <>
        <BurgerList burgers={burgers} />
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
        />
        {modal}
      </>
    );
  }
}

BurgerBuilder.propTypes = {};

export default BurgerBuilder;
