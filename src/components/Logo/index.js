import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/img/burger-logo.png';

function Logo({ location }) {
  const logoImgStyleName = 'logo-img location-' + location;

  return (
    <Link to="/" styleName="logo">
      <img src={logoImg} alt="Logo" styleName={logoImgStyleName} />
    </Link>
  );
}

Logo.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Logo;
