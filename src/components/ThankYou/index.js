import './style.module.css';

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearBurgers } from '../../actions';
import { getBurgers, getBurgersRenderArr } from '../../reducers/burgers';
import { getMenu } from '../../reducers/menu';
import BurgerList from '../BurgerList';

function ThankYou({ burgersRenderArr, clearBurgers }) {
  // const burgers = JSON.parse(
  //   new URLSearchParams(location.search).get('burgers')
  // );
  // const burgers = JSON.parse(localStorage.getItem('burgers'));

  const [localBurgersRenderArr] = useState(burgersRenderArr);
  useEffect(() => {
    clearBurgers();
  }, []);

  const burgerList =
    localBurgersRenderArr && localBurgersRenderArr.length !== 0 ? (
      <BurgerList burgers={localBurgersRenderArr} />
    ) : null;

  return (
    <section styleName="thankyou">
      <div styleName="wrapper">
        <h1>Thank you for your purchase!</h1>
        <Link to="/" styleName="link">
          To shop
        </Link>
        <Link to="/orders" styleName="link">
          Your orders
        </Link>
      </div>
      {burgerList}
    </section>
  );
}

ThankYou.propTypes = {};

const mapStateToProps = (state) => ({
  burgersRenderArr: getBurgersRenderArr(getBurgers(state), getMenu(state)),
});

export default connect(mapStateToProps, { clearBurgers })(ThankYou);
