import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function BurgerTabs({
  burgerIds,
  selectedBurger,
  changeSelectedBurger,
  addBurger,
  removeBurger,
}) {
  const tabs = burgerIds.map((id, index) => (
    <li
      styleName={`tab ${selectedBurger === index ? 'active' : ''}`}
      onClick={(event) =>
        !event.defaultPrevented &&
        selectedBurger !== index &&
        changeSelectedBurger(index)
      }
      key={id}
    >
      {`Burger ${index + 1}`}
      <div
        styleName="delete-btn"
        onClick={(event) => {
          event.preventDefault();
          removeBurger(index, burgerIds.length);
        }}
      >
        <div styleName="delete-btn-div1" />
        <div styleName="delete-btn-div2" />
      </div>
    </li>
  ));

  return (
    <section styleName="burger-tabs">
      <ul styleName="tab-list">
        {tabs}
        <button
          styleName={`add-btn ${
            burgerIds.length > 5 ? 'add-btn_disabled' : ''
          }`}
          onClick={() => addBurger(burgerIds.length)}
        >
          +
        </button>
      </ul>
    </section>
  );
}

BurgerTabs.propTypes = {
  burgerIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedBurger: PropTypes.number.isRequired,
  changeSelectedBurger: PropTypes.func.isRequired,
  addBurger: PropTypes.func.isRequired,
  removeBurger: PropTypes.func.isRequired,
};

export default BurgerTabs;
