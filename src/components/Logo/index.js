import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

import logoImg from '../../assets/img/burger-logo.png';

function Logo({ location }) {
  const logoImgStyleName = 'logo-img location-' + location;

  return (
    <a href="/" styleName="logo">
      <img src={logoImg} alt="Logo" styleName={logoImgStyleName} />
    </a>
  );
}

Logo.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Logo;
