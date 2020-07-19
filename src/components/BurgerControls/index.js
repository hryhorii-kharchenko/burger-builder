import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import CheckoutButton from '../CheckoutButton';
import IngredientComposer from '../IngredientComposer';
import IngredientMenu from '../IngredientMenu';

function BurgerControls({
  burgers,
  prices,
  availableIngredients,
  addBurger,
  removeBurger,
  addIngredient,
  addIngredientSelectedBurger,
  removeIngredient,
  checkout,
}) {
  const ingredientCount = burgers.reduce(
    (prev, current) => prev + current.length,
    0
  );

  return (
    <section styleName="burger-controls">
      <section>
        <IngredientMenu
          ingredients={availableIngredients}
          addIngredientSelectedBurger={addIngredientSelectedBurger}
        />
        <CheckoutButton onClick={checkout} isDisabled={ingredientCount === 0} />
      </section>
      <IngredientComposer
        burgers={burgers}
        prices={prices}
        addBurger={addBurger}
        removeBurger={removeBurger}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
      />
    </section>
  );
}

BurgerControls.propTypes = {
  burgers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  availableIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })
  ),
  addBurger: PropTypes.func.isRequired,
  removeBurger: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  addIngredientSelectedBurger: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
};

export default BurgerControls;
