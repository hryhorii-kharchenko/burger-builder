import './style.module.css';

import PropTypes from 'prop-types';
import React, { useLayoutEffect, useRef } from 'react';

import BurgerIngredient from '../BurgerIngredient';
import Spinner from '../Spinner';

function Burger({ ingredientList, isLoading, isDisplayOnly }) {
  const burgerRef = useRef(null);
  const burgerWrapperRef = useRef(null);

  useLayoutEffect(() => {
    if (!burgerRef.current || !burgerWrapperRef.current) return;

    const burgerHeight = burgerRef.current.offsetHeight;
    const burgerWrapperHeight = burgerWrapperRef.current.clientHeight;
    const burgerWidth = burgerRef.current.offsetWidth;
    const burgerWrapperWidth = burgerWrapperRef.current.clientWidth;

    const ratio = Math.min(
      burgerWrapperHeight / burgerHeight,
      burgerWrapperWidth / burgerWidth
    );

    burgerRef.current.style.transform = `translate(-50%, -50%) scale(${
      ratio <= 1.3 ? ratio : 1.3
    })`;
  }, [ingredientList, isLoading, burgerRef, burgerWrapperRef]);

  const burgerWrapperStyleName = `burger-wrapper ${
    isDisplayOnly ? 'display-only' : ''
  }`;

  if (isLoading) {
    return (
      <div styleName={burgerWrapperStyleName} ref={burgerWrapperRef}>
        <article styleName="burger" ref={burgerRef}>
          <Spinner />
        </article>
      </div>
    );
  }

  const ingredients =
    ingredientList.length !== 0 ? (
      ingredientList.map((ingredient) => (
        <BurgerIngredient type={ingredient.type} key={ingredient.id} />
      ))
    ) : (
      <p styleName="no-ingredient-text">Please, add the ingredients</p>
    );

  return (
    <div styleName={burgerWrapperStyleName} ref={burgerWrapperRef}>
      <article styleName="burger" ref={burgerRef}>
        {ingredients}
      </article>
    </div>
  );
}

Burger.defaultProps = {
  ingredientList: [],
  isLoading: false,
  isDisplayOnly: false,
};

Burger.propTypes = {
  ingredientList: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, type: PropTypes.string })
  ).isRequired,
  isLoading: PropTypes.bool,
  isDisplayOnly: PropTypes.bool,
};

export default Burger;
