import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import BurgerList from '../BurgerList';

function ThankYou({ location }) {
  // const burgers = JSON.parse(
  //   new URLSearchParams(location.search).get('burgers')
  // );
  const burgers = JSON.parse(localStorage.getItem('burgers'));

  const burgerList =
    burgers && burgers.length !== 0 ? <BurgerList burgers={burgers} /> : null;

  return (
    <section styleName="thankyou">
      <h1>Thank you for your purchase!</h1>
      <Link to="/" styleName="link">
        To shop
      </Link>
      <Link to="/orders" styleName="link">
        Your orders
      </Link>
      {burgerList}
    </section>
  );
}

ThankYou.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ThankYou;
