import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import axios from '../../axios-orders';
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
    axios
      .get('/orders.json')
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return null;
      })
      .then((orders) => {
        this.setState({ orders, isLoading: false });
      });
  }

  render() {
    const { orders, isLoading } = this.state;

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

export default withAxiosErrorHandler(Orders, axios);
