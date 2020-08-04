import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';

import { authEnd, authStart, signIn } from '../../actions';
import { getErrorMsg, getIsAuth } from '../../reducers/auth';
import Form from '../Form';
import Input from '../Input';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailErrorMsg: '',
      password: '',
      passwordErrorMsg: '',
    };

    props.authStart();
  }

  componentWillUnmount() {
    this.props.authEnd();
  }

  emailChangeHandler = (event) => {
    const errorMsg = this.validateEmail(event.target.value);
    this.setState({
      email: event.target.value,
      emailErrorMsg: errorMsg,
    });
  };

  validateEmail(value) {
    if (value === '') return 'Enter email';

    const isCorrect = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isCorrect) return 'Enter correct email';

    return '';
  }

  passwordChangeHandler = (event) => {
    const errorMsg = this.validatePassword(event.target.value);
    this.setState({
      password: event.target.value,
      passwordErrorMsg: errorMsg,
    });
  };

  validatePassword(value) {
    if (value === '') return 'Enter password';

    if (value.length < 6) return 'Enter at least 6 characters';

    return '';
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { email, emailErrorMsg, password, passwordErrorMsg } = this.state;

    const isValid = email && password && !(emailErrorMsg || passwordErrorMsg);

    const { signIn } = this.props;

    if (!isValid) {
      return;
    }

    signIn(email, password);
  };

  render() {
    const { isAuth, globalErrorMsg, location } = this.props;
    const { email, emailErrorMsg, password, passwordErrorMsg } = this.state;

    const idPrefix = 'sign-in-';

    const isRedirectToCheckout = new URLSearchParams(location.search).has(
      'redirectToCheckout'
    );
    const redirect = isRedirectToCheckout ? (
      <Redirect to="/checkout" />
    ) : (
      <Redirect to="/" />
    );
    if (isAuth) return redirect;

    return (
      <Form onSumbit={this.submitHandler}>
        <Input
          id={idPrefix + 'email'}
          name="email"
          label="Email"
          type="email"
          value={email}
          errorMessage={emailErrorMsg}
          onChange={this.emailChangeHandler}
          isRequired
        />
        <Input
          id={idPrefix + 'password'}
          name="password"
          label="Password"
          type="password"
          value={password}
          errorMessage={passwordErrorMsg}
          onChange={this.passwordChangeHandler}
          isRequired
        />
        <p>{globalErrorMsg}</p>
        <footer styleName="footer">
          <Input type="submit" value="Log in" />
          <Link
            to={
              isRedirectToCheckout ? '/sign-up?redirectToCheckout' : '/sign-up'
            }
          >
            Don't have an account? Sign up
          </Link>
        </footer>
      </Form>
    );
  }
}

SignInForm.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
  globalErrorMsg: getErrorMsg(state),
});

export default withRouter(
  connect(mapStateToProps, { signIn, authStart, authEnd })(SignInForm)
);
