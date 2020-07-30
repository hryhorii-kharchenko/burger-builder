import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function IngredientSummary({ burgers, burgersObj, prices }) {
  let mergedBurgers = [];

  if (burgers) {
    mergedBurgers = burgers.map((burger) => {
      return burger.reduce((prev, current) => {
        const type = current.type;
        const id = current.id;
        const index = prev.findIndex((elem) => elem[0] === type);

        if (index < 0) {
          prev.push([type, 1, id]);
          return prev;
        } else {
          prev[index][1] += 1;
          return prev;
        }
      }, []);
    });
  } else if (burgersObj) {
    mergedBurgers = burgersObj.map((burgerObj) => Object.entries(burgerObj));
  } else {
    return null;
  }

  const ingredientSummary = mergedBurgers.map((burger, index) => (
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
  burgers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  burgersObj: PropTypes.arrayOf(PropTypes.object),
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default IngredientSummary;
