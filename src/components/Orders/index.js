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
        this.setState({ orders });
      });
  }

  render() {
    const { orders } = this.state;

    if (orders) {
      const orderKeys = Object.keys(orders);
      const ordersJsx = Object.values(orders).map((order, index) => {
        const burgers = Array.from(order.burgers);
        const prices = burgers.map((burger) => burger.price);
        const burgerObjArr = burgers.map((burger) => {
          delete burger.price;
          return burger;
        });
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

    return <Spinner />;
  }
}

Orders.propTypes = {};

export default withAxiosErrorHandler(Orders, axios);
