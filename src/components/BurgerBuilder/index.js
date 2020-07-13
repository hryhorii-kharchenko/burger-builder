import PropTypes from 'prop-types';
import React from 'react';

import Burger from '../Burger';
import BurgerIngredient from '../BurgerIngredient';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: ['bread-top', 'cheese', 'meat', 'salad', 'bread-bottom'],
    };
  }

  render() {
    // {  } = this.props;
    const { ingredients } = this.state;

    return (
      <>
        <Burger ingredientList={ingredients} />
      </>
    );
  }
}

BurgerBuilder.propTypes = {};

export default BurgerBuilder;
