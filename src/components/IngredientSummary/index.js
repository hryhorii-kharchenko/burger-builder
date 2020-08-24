import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function IngredientSummary({ burgersIngredientTuples, prices, isFullWidth }) {
  const ingredientSummary = burgersIngredientTuples.map((burger, index) => (
    <article styleName="burger">
      <h3 styleName="title">Burger {index + 1}</h3>
      <ul styleName="ingredient-list">
        {burger.map((ingredient) => (
          <li styleName="list-item" key={ingredient[2]}>
            {ingredient[0]}: {ingredient[1]}
          </li>
        ))}
      </ul>
      <p styleName="price">
        Price: <strong>{prices[index]}$</strong>
      </p>
    </article>
  ));

  const totalPrice = prices
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2);

  return (
    <article styleName={`order ${isFullWidth ? ' full-width' : ''}`}>
      {ingredientSummary}
      <p styleName="total-price">
        Total price: <strong>{totalPrice}$</strong>
      </p>
    </article>
  );
}

IngredientSummary.defaultProps = {
  burgers: null,
  burgersObj: null,
  isFullWidth: false,
};

IngredientSummary.propTypes = {
  burgersIngredientTuples: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
  ),
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  isFullWidth: PropTypes.bool,
};

export default IngredientSummary;
