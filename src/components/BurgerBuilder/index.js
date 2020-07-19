import PropTypes from 'prop-types';
import React from 'react';
import uniqid from 'uniqid';

import Burger from '../Burger';
import BurgerControls from '../BurgerControls';
import BurgerIngredient from '../BurgerIngredient';
import BurgerList from '../BurgerList';

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
    };

    this.addBurger = this.addBurger.bind(this);
    this.removeBurger = this.removeBurger.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.addIngredientSelectedBurger = this.addIngredientSelectedBurger.bind(
      this
    );
    this.removeIngredient = this.removeIngredient.bind(this);
    this.checkout = this.checkout.bind(this);
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

  checkout() {}

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

    return (
      <>
        <BurgerList burgers={burgers} />
        <BurgerControls
          burgers={burgers}
          prices={prices}
          availableIngredients={availableIngredients}
          addBurger={this.addBurger}
          removeBurger={this.removeBurger}
          addIngredient={this.addIngredient}
          addIngredientSelectedBurger={this.addIngredientSelectedBurger}
          removeIngredient={this.removeIngredient}
          checkout={this.checkout}
        />
      </>
    );
  }
}

BurgerBuilder.propTypes = {};

export default BurgerBuilder;
