import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function Form({ children, className, onSumbit }) {
  return (
    <form className={className} onSubmit={onSumbit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSumbit: PropTypes.func.isRequired,
};

export default Form;
