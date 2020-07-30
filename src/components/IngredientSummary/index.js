import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function IngredientSummary({ burgersIngredientTuples, prices }) {
  const ingredientSummary = burgersIngredientTuples.map((burger, index) => (
    <article>
      <h3>Burger {index + 1}</h3>
      <ul>
        {burger.map((ingredient) => (
          <li key={ingredient[2]}>
            {ingredient[0]}: {ingredient[1]}
          </li>
        ))}
      </ul>
      <p>
        Price: <strong>{prices[index]}$</strong>
      </p>
    </article>
  ));

  const totalPrice = prices
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2);

  return (
    <section>
      {ingredientSummary}
      <p>
        Total price: <strong>{totalPrice}$</strong>
      </p>
    </section>
  );
}

IngredientSummary.defaultProps = {
  burgers: null,
  burgersObj: null,
};

IngredientSummary.propTypes = {
  burgersIngredientTuples: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
  ),
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default IngredientSummary;
