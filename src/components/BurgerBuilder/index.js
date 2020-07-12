import PropTypes from 'prop-types';
import React from 'react';

import BurgerIngredient from '../BurgerIngredient';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // {  } = this.props;
    // {  } = this.state;

    return (
      <>
        <BurgerIngredient type="salad" />
      </>
    );
  }
}

BurgerBuilder.propTypes = {};

export default BurgerBuilder;
