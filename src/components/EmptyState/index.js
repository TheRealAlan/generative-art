import React from 'react';

import stylesheet from './EmptyState.module.css';

function EmptyState() {
  return (
    <div className={stylesheet.root}>
      <p className={stylesheet.text}>No work loaded.</p>
    </div>
  );
}

export default EmptyState;
