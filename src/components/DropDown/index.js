import './style.module.css';

import PropTypes from 'prop-types';
import React, { useState } from 'react';

function DropDown({ value, onChange, possibleValues, isDisabled }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropDownStyleName = 'dropdown' + (isDropDownOpen ? ' open' : '');

  const choises = possibleValues.map((value) => (
    <button type="button" onClick={() => onChange(value)} key={value}>
      {value}
    </button>
  ));

  function onFocus() {
    setIsDropDownOpen(true);
  }

  function onBlur(event) {
    const currentTarget = event.currentTarget;

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        // You can invoke a callback or add custom logic here
        setIsDropDownOpen(false);
      }
    }, 0);
  }

  return (
    <div tabIndex="1" onFocus={onFocus} onBlur={onBlur}>
      <div>{value}</div>
      <div>{choises}</div>
    </div>
  );
}

DropDown.defaultProps = {
  value: null,
  isDisabled: false,
};

DropDown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  possibleValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDisabled: PropTypes.bool,
};

export default DropDown;
