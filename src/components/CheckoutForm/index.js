import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import axios from '../../axios-orders';
import DropDown from '../DropDown';
import Form from '../Form';
import Input from '../Input';

class CheckoutForm extends React.Component {
  state = {
    name: '',
    email: '',
    address1: '',
    zipCode: '',
    nameErrorMsg: '',
    emailErrorMsg: '',
    address1ErrorMsg: '',
    zipCodeErrorMsg: '',
    globalErrorMsg: '',

    city: 'Donetsk',
    deliveryMethod: 'Fastest',
    cityList: ['Donetsk', 'Kiev', ' Moscow'],
    deliveryMethodList: ['Fastest', 'Cheapest', 'USP', 'Nova poshta'],
  };

  nameChangeHandler = (event) => {
    // this.setState({ name: event.target.value });
    const errorMsg = this.validateName(event.target.value);
    this.setState({
      name: event.target.value,
      nameErrorMsg: errorMsg,
    });
  };

  nameBlurHandler = (event) => {
    // const errorMsg = this.validateName(event.target.value);
    // this.setState({
    //   name: event.target.value,
    //   nameErrorMsg: errorMsg,
    // });
  };

  validateName(value) {
    if (value === '') return 'Enter name';

    const isCorrect = /([A-z]+)+/.test(value);
    if (!isCorrect) return 'Enter correct name';

    return '';
  }

  emailChangeHandler = (event) => {
    // this.setState({ email: event.target.value });
    const errorMsg = this.validateEmail(event.target.value);
    this.setState({
      email: event.target.value,
      emailErrorMsg: errorMsg,
    });
  };

  emailBlurHandler = (event) => {
    // const errorMsg = this.validateEmail(event.target.value);
    // this.setState({
    //   email: event.target.value,
    //   emailErrorMsg: errorMsg,
    // });
  };

  validateEmail(value) {
    if (value === '') return 'Enter email';

    const isCorrect = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isCorrect) return 'Enter correct email';

    return '';
  }

  address1ChangeHandler = (event) => {
    // this.setState({ address1: event.target.value });
    const errorMsg = this.validateAddress1(event.target.value);
    this.setState({
      address1: event.target.value,
      address1ErrorMsg: errorMsg,
    });
  };

  address1BlurHandler = (event) => {
    // const errorMsg = this.validateAddress1(event.target.value);
    // this.setState({
    //   address1: event.target.value,
    //   address1ErrorMsg: errorMsg,
    // });
  };

  validateAddress1(value) {
    if (value === '') return 'Enter address';

    const isCorrect = /([\w])+ \d+/.test(value);
    if (!isCorrect) return 'Enter correct address';

    return '';
  }

  zipCodeChangeHandler = (event) => {
    // this.setState({ zipCode: event.target.value });
    const errorMsg = this.validateZipCode(event.target.value);
    this.setState({
      zipCode: event.target.value,
      zipCodeErrorMsg: errorMsg,
    });
  };

  zipCodeBlurHandler = (event) => {
    // const errorMsg = this.validateZipCode(event.target.value);
    // this.setState({
    //   zipCode: event.target.value,
    //   zipCodeErrorMsg: errorMsg,
    // });
  };

  validateZipCode(value) {
    if (value === '') return 'Enter zip code';

    const isCorrect = /^\d{5}$/.test(value);
    if (!isCorrect) return 'Enter correct zip code';

    return '';
  }

  cityChangeHandler = (value) => {
    this.setState({ city: value });
  };

  deliveryMethodChangeHandler = (value) => {
    this.setState({ deliveryMethod: value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const {
      name,
      email,
      address1,
      zipCode,
      city,
      deliveryMethod,
      nameErrorMsg,
      emailErrorMsg,
      address1ErrorMsg,
      zipCodeErrorMsg,
    } = this.state;
    const isValid =
      name &&
      email &&
      address1 &&
      zipCode &&
      city &&
      deliveryMethod &&
      !(nameErrorMsg || emailErrorMsg || address1ErrorMsg || zipCodeErrorMsg);

    // this.setState({
    //   isCheckoutRequestLoading: true,
    // });

    if (!isValid) {
      // this.setState({ globalErrorMsg: 'Some fields are incorrect or empty' });
      return;
    }

    const { burgers, prices, history } = this.props;

    if (burgers.length === 0 || prices.length === 0) {
      this.setState({ globalErrorMsg: 'There is no burger to order' });
      return;
    }

    this.setState({ globalErrorMsg: '' });

    const totalPrice = parseFloat(
      prices.reduce((prev, current) => prev + current, 0).toFixed(2)
    );
    const burgerObjects = burgers.map((burger, index) => {
      const burgerObj = {};

      for (const ingredient of burger) {
        const bareIngredient = ingredient.slice(0, -9);

        if (burgerObj[bareIngredient]) {
          burgerObj[bareIngredient] += 1;
        } else {
          burgerObj[bareIngredient] = 1;
        }
      }
      burgerObj.price = prices[index];

      return burgerObj;
    });

    const orderInfo = {
      totalPrice,
      burgers: burgerObjects,
      customer: {
        name,
        email,
        address: { address1, zipCode, city },
      },
      deliveryMethod,
    };

    axios
      .post('/orders.json', orderInfo)
      .then((response) => this.deactivateCheckoutModal())
      .catch((error) => console.log(error))
      .finally(
        () => {
          localStorage.removeItem('burgers');
          localStorage.removeItem('prices');
          history.push(
            '/thankyou'
            // '/thankyou/?burgers=' + encodeURIComponent(JSON.stringify(burgers))
          );
        }
        // this.setState({
        //   isCheckoutRequestLoading: false,
        // })
      );
  };

  render() {
    const {
      name,
      email,
      address1,
      zipCode,
      city,
      deliveryMethod,
      nameErrorMsg,
      emailErrorMsg,
      address1ErrorMsg,
      zipCodeErrorMsg,
      globalErrorMsg,
      cityList,
      deliveryMethodList,
    } = this.state;

    const idPrefix = 'checkout-form-';

    return (
      <Form onSumbit={this.onSubmit}>
        <Input
          id={idPrefix + 'name'}
          name="name"
          label="Name"
          value={name}
          errorMessage={nameErrorMsg}
          onChange={this.nameChangeHandler}
          onBlur={this.nameBlurHandler}
          isRequired
        />
        <Input
          id={idPrefix + 'email'}
          name="email"
          label="Email"
          type="email"
          value={email}
          errorMessage={emailErrorMsg}
          onChange={this.emailChangeHandler}
          onBlur={this.emailBlurHandler}
          isRequired
        />
        <Input
          id={idPrefix + 'address1'}
          name="address1"
          label="Address 1"
          value={address1}
          errorMessage={address1ErrorMsg}
          onChange={this.address1ChangeHandler}
          onBlur={this.address1BlurHandler}
          isRequired
        />
        <Input
          id={idPrefix + 'zipCode'}
          name="zipCode"
          label="Zip code"
          value={zipCode}
          errorMessage={zipCodeErrorMsg}
          onChange={this.zipCodeChangeHandler}
          onBlur={this.zipCodeBlurHandler}
          isRequired
        />
        <DropDown
          value={city}
          possibleValues={cityList}
          onChange={this.cityChangeHandler}
        />
        <DropDown
          value={deliveryMethod}
          possibleValues={deliveryMethodList}
          onChange={this.deliveryMethodChangeHandler}
        />
        <p>{globalErrorMsg}</p>
        <Input type="submit" value="Submit" />
      </Form>
    );
  }
}

CheckoutForm.propTypes = {
  burgers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(CheckoutForm);
