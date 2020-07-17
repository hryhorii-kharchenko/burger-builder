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
      length: 1,
      0: [
        'bread-top-iob0ucot',
        'cheese-iob0ucor',
        'meat-iob0ucoe',
        'salad-iob0ucow',
        'bread-bottom-iob0ucoq',
      ],
      availableIngredients: [{ name: 'Bread top', id: 'bread-top' }],
    };

    this.addBurger = this.addBurger.bind(this);
    this.removeBurger = this.removeBurger.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
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

  removeIngredient(burgerId, ingredientId) {
    if (burgerId >= this.state.length) return false;

    this.setState((oldState) => {
      const newState = oldState[burgerId].filter(
        (ingredient) => ingredient !== ingredientId
      );

      return {
        [burgerId]: newState,
      };
    });
  }

  render() {
    const { availableIngredients } = this.state;

    const burgers = Array.from(this.state).map((burger) =>
      burger.map((ingredient) =>
        availableIngredients.find(
          (available) => available.id === ingredient.slice(0, -9)
        )
      )
    );

    return (
      <>
        <BurgerList burgers={burgers} />
        <BurgerControls
          burgers={burgers}
          availableIngredients={availableIngredients}
          addBurger={this.addBurger}
          removeBurger={this.removeBurger}
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
        />
      </>
    );
  }
}

BurgerBuilder.propTypes = {};

export default BurgerBuilder;
