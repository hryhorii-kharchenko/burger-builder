import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';

import { authEnd, authStart, signUp } from '../../actions';
import { getErrorMsg, getIsAuth } from '../../reducers/auth';
import Form from '../Form';
import Input from '../Input';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailErrorMsg: '',
      password: '',
      passwordErrorMsg: '',
      passwordConfirm: '',
      passwordConfirmErrorMsg: '',
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

  passwordConfirmChangeHandler = (event) => {
    const errorMsg = this.validatePasswordConfirm(event.target.value);
    this.setState({
      passwordConfirm: event.target.value,
      passwordConfirmErrorMsg: errorMsg,
    });
  };

  validatePasswordConfirm(value) {
    if (value === '') return 'Confirm password';

    if (value !== this.state.password) return 'Passwords do not match';

    return '';
  }

  submitHandler = (event) => {
    event.preventDefault();
    const {
      email,
      emailErrorMsg,
      password,
      passwordErrorMsg,
      passwordConfirm,
      passwordConfirmErrorMsg,
    } = this.state;

    const isValid =
      email &&
      password &&
      passwordConfirm &&
      !(emailErrorMsg || passwordErrorMsg || passwordConfirmErrorMsg);

    if (!isValid) {
      return;
    }

    const { signUp } = this.props;
    signUp(email, password);
  };

  render() {
    const { isAuth, globalErrorMsg, location } = this.props;
    const {
      email,
      emailErrorMsg,
      password,
      passwordErrorMsg,
      passwordConfirm,
      passwordConfirmErrorMsg,
    } = this.state;

    const idPrefix = 'sign-up-';

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
        <Input
          id={idPrefix + 'password-confirm'}
          name="passwordConfirm"
          label="Confirm password"
          type="password"
          value={passwordConfirm}
          errorMessage={passwordConfirmErrorMsg}
          onChange={this.passwordConfirmChangeHandler}
          isRequired
        />
        <p>{globalErrorMsg}</p>
        <footer styleName="footer">
          <Input type="submit" value="Sign up" />
          <Link
            to={
              isRedirectToCheckout ? '/sign-in?redirectToCheckout' : '/sign-in'
            }
          >
            Already have an account? Log in
          </Link>
        </footer>
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
  globalErrorMsg: getErrorMsg(state),
});

export default withRouter(
  connect(mapStateToProps, { signUp, authStart, authEnd })(SignUpForm)
);
