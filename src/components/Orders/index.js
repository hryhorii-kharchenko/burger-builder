import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import axios from '../../axios-orders';
import IngredientSummary from '../IngredientSummary';
import Spinner from '../Spinner';
import withAxiosErrorHandler from '../withAxiosErrorHandler';

class Orders extends React.Component {
  state = {
    orders: null,
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
        const burgers = this.setState({ orders });
      });
  }

  render() {
    const { orders } = this.state;

    if (orders) {
      const orderKeys = Object.keys(orders);
      const ordersJsx = Object.values(orders).map((order, index) => {
        const burgers = Array.from(order.burgers);
        const prices = burgers.map((burger) => burger.price);
        const burgersWithoutPrices = burgers.map((burger) => {
          delete burger.price;
          return burger;
        });
        return (
          <article>
            <h3>Order {orderKeys[index]}</h3>
            <IngredientSummary
              burgersObj={burgersWithoutPrices}
              prices={prices}
            />
          </article>
        );
      });

      return <section>{ordersJsx}</section>;
    }

    return <Spinner />;
  }
}

Orders.propTypes = {};

export default withAxiosErrorHandler(Orders, axios);
