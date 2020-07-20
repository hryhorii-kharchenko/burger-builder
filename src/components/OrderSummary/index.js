import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import CloseButton from '../CloseButton';

function OrderSummary({
  summary,
  totalPrice,
  cancelBtnClick,
  checkoutBtnClick,
  checkouBtntId,
}) {
  return (
    <div styleName="order-summary">
      <header>
        <h2>Order summary</h2>
      </header>
      <main className="body">
        {summary}
        <p>
          Total price: <strong>{totalPrice}$</strong>
        </p>
      </main>
      <footer className="footer">
        <Button color="danger" onClick={cancelBtnClick}>
          Cancel
        </Button>
        <Button id={checkouBtntId} color="success" onClick={checkoutBtnClick}>
          Checkout
        </Button>
      </footer>
      <CloseButton onClick={cancelBtnClick} top="10px" right="10px" />
    </div>
  );
}

OrderSummary.defaultProps = {
  checkouBtntId: null,
};

OrderSummary.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.element).isRequired,
  totalPrice: PropTypes.number.isRequired,
  cancelBtnClick: PropTypes.func.isRequired,
  checkoutBtnClick: PropTypes.func.isRequired,
  checkouBtntId: PropTypes.string,
};

export default OrderSummary;
