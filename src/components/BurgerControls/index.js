import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import CheckoutButton from '../CheckoutButton';
import IngredientComposer from '../IngredientComposer';
import IngredientMenu from '../IngredientMenu';

function BurgerControls({
  burgers,
  burgerIds,
  prices,
  totalPrice,
  availableIngredients,
  addBurger,
  removeBurger,
  addIngredient,
  addIngredientSelectedBurger,
  removeIngredient,
  activateCheckoutModal,
  isLoading,
  selectedBurger,
  changeSelectedBurger,
}) {
  const ingredientCount = burgers.reduce(
    (prev, current) => prev + current.length,
    0
  );

  return (
    <section styleName="burger-controls">
      <IngredientMenu
        ingredients={availableIngredients}
        totalPrice={totalPrice}
        addIngredientSelectedBurger={addIngredientSelectedBurger}
      />
      <IngredientComposer
        burgers={burgers}
        burgerIds={burgerIds}
        prices={prices}
        addBurger={addBurger}
        removeBurger={removeBurger}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        isLoading={isLoading}
        selectedBurger={selectedBurger}
        changeSelectedBurger={changeSelectedBurger}
      />
      <section styleName="checkout">
        <p styleName="checkout-p">
          Total price: <strong>{totalPrice}$</strong>
        </p>
        <CheckoutButton
          onClick={activateCheckoutModal}
          isDisabled={ingredientCount === 0}
        />
      </section>
    </section>
  );
}

BurgerControls.defaultProps = {
  isLoading: false,
};

BurgerControls.propTypes = {
  burgers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, type: PropTypes.string })
    )
  ).isRequired,
  burgerIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  totalPrice: PropTypes.number.isRequired,
  availableIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      cssName: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  addBurger: PropTypes.func.isRequired,
  removeBurger: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  addIngredientSelectedBurger: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  activateCheckoutModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  selectedBurger: PropTypes.number.isRequired,
  changeSelectedBurger: PropTypes.func.isRequired,
};

export default BurgerControls;
