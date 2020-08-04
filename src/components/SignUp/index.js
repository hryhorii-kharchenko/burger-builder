import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import SignUpForm from '../SignUpForm';

function SignUp({}) {
  return (
    <section styleName="sign-up">
      <SignUpForm />
    </section>
  );
}

SignUp.propTypes = {};

export default SignUp;
