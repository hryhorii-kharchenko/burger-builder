import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import CloseButton from '../CloseButton';
import Spinner from '../Spinner';

function OrderSummary({
  summary,
  totalPrice,
  cancelBtnClick,
  checkoutUrl,
  checkouBtntId,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div styleName="order-summary loading">
        <Spinner />
      </div>
    );
  }

  return (
    <div styleName="order-summary">
      <header>
        <h2>Order summary</h2>
      </header>
      <main className="body">{summary}</main>
      <footer className="footer">
        <Button color="danger" onClick={cancelBtnClick}>
          Cancel
        </Button>
        <Button id={checkouBtntId} color="success" url={checkoutUrl}>
          Checkout
        </Button>
      </footer>
      <CloseButton onClick={cancelBtnClick} top="10px" right="10px" />
    </div>
  );
}

OrderSummary.defaultProps = {
  checkouBtntId: null,
  isLoading: false,
};

OrderSummary.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.element).isRequired,
  totalPrice: PropTypes.number.isRequired,
  cancelBtnClick: PropTypes.func.isRequired,
  checkoutUrl: PropTypes.string.isRequired,
  checkouBtntId: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default OrderSummary;
