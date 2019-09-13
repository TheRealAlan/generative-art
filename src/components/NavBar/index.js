import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as FullscreenIcon } from 'icons/fullscreen.svg';
import { ReactComponent as MenuIcon } from 'icons/menu.svg';

import stylesheet from './NavBar.module.css';

function NavBar({
  handleFullscreenButtonClick,
  handleMenuButtonClick,
  isVisible,
}) {
  const rootStyles = cx(stylesheet.root, {
    [stylesheet.isVisible]: isVisible,
  });

  return (
    <div className={rootStyles}>
      <button
        className={stylesheet.fullscreenButton}
        onClick={handleFullscreenButtonClick}
      >
        <FullscreenIcon title="Fullscreen" />
      </button>
      <button className={stylesheet.menuButton} onClick={handleMenuButtonClick}>
        <MenuIcon title="Menu" />
      </button>
    </div>
  );
}

NavBar.propTypes = {
  handleFullscreenButtonClick: PropTypes.func.isRequired,
  handleMenuButtonClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default NavBar;
