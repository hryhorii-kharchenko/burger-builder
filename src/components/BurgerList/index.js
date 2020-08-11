import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Burger from '../Burger';
import BurgerTabs from '../BurgerTabs';

function BurgerList({
  burgers,
  burgerIds,
  isLoading,
  selectedBurger,
  changeSelectedBurger,
  addBurger,
  removeBurger,
}) {
  const burgerElements = burgers.map((burgerIngredients, index) => (
    <Burger
      ingredientList={burgerIngredients}
      isLoading={isLoading}
      key={burgerIds[index]}
    />
  ));

  return (
    <section styleName="burger-list">
      <BurgerTabs
        burgerIds={burgerIds}
        selectedBurger={selectedBurger}
        changeSelectedBurger={changeSelectedBurger}
        addBurger={addBurger}
        removeBurger={removeBurger}
      />
      {burgerElements}
    </section>
  );
}

BurgerList.defaultProps = {
  isLoading: false,
};

BurgerList.propTypes = {
  burgers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, type: PropTypes.string })
    )
  ).isRequired,
  burgerIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool,
  selectedBurger: PropTypes.number.isRequired,
  changeSelectedBurger: PropTypes.func.isRequired,
  addBurger: PropTypes.func.isRequired,
  removeBurger: PropTypes.func.isRequired,
};

export default BurgerList;
