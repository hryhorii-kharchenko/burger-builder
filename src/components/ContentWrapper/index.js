import './style.module.css';

import PropTypes from 'prop-types';
import React from 'react';

function ContentWrapper({ children }) {
  return <div styleName="content-wrapper">{children}</div>;
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentWrapper;
