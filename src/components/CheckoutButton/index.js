import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function CheckoutButton({ isDisabled, onClick }) {
  return (
    <button disabled={isDisabled} styleName="checkout-button" onClick={onClick}>
      Checkout now
    </button>
  );
}

CheckoutButton.defaultProps = {
  isDisabled: false,
};

CheckoutButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default CheckoutButton;
