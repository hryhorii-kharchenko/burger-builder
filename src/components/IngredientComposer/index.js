import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import BurgerPrice from '../BurgerPrice';
import IngredientList from '../IngredientList';

function IngredientComposer({
  burgers,
  prices,
  addBurger,
  removeBurger,
  addIngredient,
  removeIngredient,
}) {
  const burgerLists = burgers.map((burger, index) => (
    <article>
      <BurgerPrice price={prices[index]} />
      <IngredientList
        ingredients={burger}
        removeIngredient={removeIngredient(index)}
      />
    </article>
  ));

  return (
    <section>
      {/* <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ingredient-list" />
        {(provided) => (
          <IngredientList
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            availableIngredients={availableIngredients}
          >
            {provided.placeholder}
          </IngredientList>
        )}
      </DragDropContext> */}
      {burgerLists}
    </section>
  );
}

IngredientComposer.propTypes = {
  burgers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  addBurger: PropTypes.func.isRequired,
  removeBurger: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
};

export default IngredientComposer;