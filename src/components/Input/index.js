import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function Input({
  id,
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  isDisabled,
  isRequired,
  errorMessage,
}) {
  if (type === 'submit') {
    return <input type={type} styleName="input-submit" />;
  }

  return (
    <>
      <label htmlFor={id} styleName="label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={isDisabled}
        required={isRequired}
        styleName={'input input-' + type}
      />
      <p styleName={'error' + (errorMessage ? ' active' : '')}>
        {errorMessage}
      </p>
    </>
  );
}

Input.defaultProps = {
  label: '',
  type: 'text',
  isDisabled: false,
  isRequired: false,
  errorMessage: '',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default React.memo(Input);
