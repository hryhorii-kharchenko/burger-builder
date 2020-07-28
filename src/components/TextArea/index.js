import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function TextArea({ id, name, value, onChange, isDisabled, errorMessage }) {
  return (
    <>
      <label for={id} styleName="label">
        {name[0].toUpperCase() + name.slice(1)}:{' '}
      </label>
      <textarea
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        styleName={'textarea textarea-' + type}
      ></textarea>
      <p styleName={'error' + (errorMessage ? ' active' : '')}>
        {errorMessage}
      </p>
    </>
  );
}

TextArea.defaultProps = {
  isDisabled: false,
  errorMessage: '',
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default TextArea;
