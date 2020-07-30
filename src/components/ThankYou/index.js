import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getBurgers, getBurgersRenderArr } from '../../reducers/burgers';
import { getMenu } from '../../reducers/menu';
import BurgerList from '../BurgerList';

function ThankYou({ burgersRenderArr }) {
  // const burgers = JSON.parse(
  //   new URLSearchParams(location.search).get('burgers')
  // );
  // const burgers = JSON.parse(localStorage.getItem('burgers'));

  const burgerList =
    burgersRenderArr && burgersRenderArr.length !== 0 ? (
      <BurgerList burgers={burgersRenderArr} />
    ) : null;

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

ThankYou.propTypes = {};

const mapStateToProps = (state) => ({
  burgersRenderArr: getBurgersRenderArr(getBurgers(state), getMenu(state)),
});

export default connect(mapStateToProps)(ThankYou);
