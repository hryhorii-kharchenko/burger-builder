import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import IngredientComposer from '../IngredientComposer';
import IngredientList from '../IngredientList';

function BurgerControls({
  burgers,
  availableIngredients,
  addBurger,
  removeBurger,
  addIngredient,
  removeIngredient,
}) {
  function onDragEnd() {
    //reorder columns
  }

  return (
    <section>
      <IngredientList ingredients={availableIngredients} />
      <IngredientComposer
        burgers={burgers}
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
  availableIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  addBurger: PropTypes.func.isRequired,
  removeBurger: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
};

export default BurgerControls;
