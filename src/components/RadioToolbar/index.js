import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function RadioToolbar({ title, value, onChange, possibleValues, isDisabled }) {
  // const [isRadioToolbarOpen, setIsRadioToolbarOpen] = useState(false);
  // const dropDownStyleName = 'dropdown' + (isRadioToolbarOpen ? ' open' : '');

  const choises = possibleValues.map(({ id, title }, index) => (
    // <button type="button" onClick={() => onChange(value)} key={value}>
    //   {value}
    // </button>
    <div styleName="radio-wrapper" key={id}>
      <input
        type="radio"
        id={id}
        name={id}
        value={id}
        checked={value === id}
        onChange={() => onChange(id)}
      />
      <label for={id}>{title}</label>
    </div>
  ));

  // function onFocus() {
  //   setIsRadioToolbarOpen(true);
  // }

  // function onBlur(event) {
  //   const currentTarget = event.currentTarget;

  //   // Check the newly focused element in the next tick of the event loop
  //   setTimeout(() => {
  //     // Check if the new activeElement is a child of the original container
  //     if (!currentTarget.contains(document.activeElement)) {
  //       // You can invoke a callback or add custom logic here
  //       setIsRadioToolbarOpen(false);
  //     }
  //   }, 0);
  // }

  return (
    // <div tabIndex="1" onFocus={onFocus} onBlur={onBlur}>
    <div styleName="radio-toolbar">
      <h3>{title}</h3>
      <div styleName="choise-container">{choises}</div>
    </div>
  );
}

RadioToolbar.defaultProps = {
  value: null,
  isDisabled: false,
};

RadioToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  possibleValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDisabled: PropTypes.bool,
};

export default RadioToolbar;
