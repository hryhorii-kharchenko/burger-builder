import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import axios from '../../axios-orders';
import { getIsAuth, getToken, getUserId } from '../../reducers/auth';
import { getBurgersIngredientTuplesFromBurgersObjArr } from '../../reducers/burgers';
import IngredientSummary from '../IngredientSummary';
import Spinner from '../Spinner';
import withAxiosErrorHandler from '../withAxiosErrorHandler';

class Orders extends React.Component {
  state = {
    orders: null,
    isLoading: true,
  };

  componentDidMount() {
    const { isAuth, token, userId } = this.props;
    if (!isAuth) return;

    const ordersUrl = `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    axios
      .get(ordersUrl)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return null;
      })
      .then((orders) => {
        const isOrdersEmpty =
          Object.keys(orders).length === 0 && orders.constructor === Object;
        this.setState({
          orders: isOrdersEmpty ? null : orders,
          isLoading: false,
        });
      });
  }

  render() {
    const { orders, isLoading } = this.state;
    const { isAuth } = this.props;

    if (!isAuth) return <Redirect to="/sign-in" />;
    if (isLoading) return <Spinner />;

    if (!orders)
      return (
        <section style={{ textAlign: 'center' }}>
          You haven't ordered from us yet!
        </section>
      );

    const orderKeys = Object.keys(orders);
    const ordersJsx = Object.values(orders).map((order, index) => {
      const burgerObjArr = Array.from(order.burgers);
      const { prices } = order;
      const burgersIngredientTuples = getBurgersIngredientTuplesFromBurgersObjArr(
        burgerObjArr
      );

      return (
        <article>
          <h3>Order {orderKeys[index]}</h3>
          <IngredientSummary
            burgersIngredientTuples={burgersIngredientTuples}
            prices={prices}
          />
        </article>
      );
    });

    return <section>{ordersJsx}</section>;
  }
}

Orders.propTypes = {};

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
  token: getToken(state),
  userId: getUserId(state),
});

export default withAxiosErrorHandler(connect(mapStateToProps)(Orders), axios);
