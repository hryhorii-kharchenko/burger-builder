import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import IngredientList from '../IngredientList';
import Spinner from '../Spinner';

function IngredientComposer({
  burgers,
  prices,
  addBurger,
  removeBurger,
  addIngredient,
  removeIngredient,
  isLoading,
}) {
  const burgerLists = burgers.map((burger, index) => (
    <article>
      <p>Burger {index + 1}</p>
      <p>
        Price: <strong>{prices[index].toFixed(2)}$</strong>
      </p>
      <IngredientList
        ingredients={burger}
        removeIngredient={removeIngredient(index)}
      />
    </article>
  ));
  const output = isLoading ? <Spinner styleName="spinner" /> : burgerLists;

  return (
    <section styleName="ingredient-composer">
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
      {output}
    </section>
  );
}

IngredientComposer.defaultProps = {
  isLoading: false,
};

IngredientComposer.propTypes = {
  burgers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  addBurger: PropTypes.func.isRequired,
  removeBurger: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default IngredientComposer;
