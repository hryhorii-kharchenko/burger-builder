import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import SignInForm from '../SignInForm';

function SignIn({}) {
  return (
    <section styleName="sign-in">
      <SignInForm />
    </section>
  );
}

SignIn.propTypes = {};

export default SignIn;
