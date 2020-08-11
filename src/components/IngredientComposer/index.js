import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import IngredientList from '../IngredientList';
import Spinner from '../Spinner';

function IngredientComposer({
  burgers,
  burgerIds,
  prices,
  addBurger,
  removeBurger,
  addIngredient,
  removeIngredient,
  isLoading,
  selectedBurger,
  changeSelectedBurger,
}) {
  const burgerLists = burgers.map((burger, index) => (
    <article
      styleName={`burger ${selectedBurger === index ? 'active' : ''}`}
      onClick={(event) =>
        !event.defaultPrevented &&
        selectedBurger !== index &&
        changeSelectedBurger(index)
      }
      key={burgerIds[index]}
    >
      <h3 styleName="burger-title">Burger {index + 1}</h3>
      <p styleName="burger-price">
        Price: <strong>{prices[index].toFixed(2)}$</strong>
      </p>
      <IngredientList
        ingredients={burger}
        removeIngredient={(ingredientIndex) => (event) => {
          event.preventDefault();
          removeIngredient(index, ingredientIndex);
        }}
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
  burgers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, type: PropTypes.string })
    )
  ).isRequired,
  burgerIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  addBurger: PropTypes.func.isRequired,
  removeBurger: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  selectedBurger: PropTypes.number.isRequired,
  changeSelectedBurger: PropTypes.func.isRequired,
};

export default IngredientComposer;
