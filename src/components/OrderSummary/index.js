import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

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
