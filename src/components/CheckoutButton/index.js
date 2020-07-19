import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

function CheckoutButton({ isDisabled, onClick }) {
  return (
    <Button
      disabled={isDisabled}
      isCustomStyled
      styleName="checkout-button"
      onClick={onClick}
    >
      Checkout now
    </Button>
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
