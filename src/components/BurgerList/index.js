import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Burger from '../Burger';
import BurgerTabs from '../BurgerTabs';

function BurgerList({
  burgers,
  isDisplayOnly,
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
      isDisplayOnly={isDisplayOnly}
      key={burgerIds[index]}
    />
  ));

  return (
    <section styleName="burger-list">
      {isDisplayOnly ? null : (
        <BurgerTabs
          burgerIds={burgerIds}
          selectedBurger={selectedBurger}
          changeSelectedBurger={changeSelectedBurger}
          addBurger={addBurger}
          removeBurger={removeBurger}
        />
      )}
      {burgerElements}
    </section>
  );
}

BurgerList.defaultProps = {
  isDisplayOnly: false,
  isLoading: false,
  selectedBurger: 0,
  changeSelectedBurger: () => {},
  addBurger: () => {},
  removeBurger: () => {},
};

BurgerList.propTypes = {
  burgers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, type: PropTypes.string })
    )
  ).isRequired,
  isDisplayOnly: PropTypes.bool,
  burgerIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool,
  selectedBurger: PropTypes.number,
  changeSelectedBurger: PropTypes.func,
  addBurger: PropTypes.func,
  removeBurger: PropTypes.func,
};

export default BurgerList;
