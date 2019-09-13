import React from 'react';
import PropTypes from 'prop-types';

import stylesheet from './Loading.module.css';

function Loading({ componentName }) {
  return (
    <div className={stylesheet.root}>
      <p className={stylesheet.text}>Loading {componentName}...</p>
    </div>
  );
}

Loading.propTypes = {
  componentName: PropTypes.string,
};

export default Loading;
