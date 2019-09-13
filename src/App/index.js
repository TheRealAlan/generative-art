import React, { useState, useEffect, useCallback, useRef } from 'react';
import Loadable from 'react-loadable';
import Fullscreen from 'react-full-screen';
import cx from 'classnames';

import debounce from 'fn/debounce';

import Modal from 'components/shared/Modal';
import EmptyState from 'components/EmptyState';
import Loading from 'components/Loading';
import NavBar from 'components/NavBar';

import stylesheet from './App.module.css';

let Module = null;

function App() {
  const availableWorks = ['Cube', 'PointsLines'];
  const [active, setActive] = useState(null);
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  let mouseMoveTimeoutRef = useRef(null);

  const appClassList = cx(stylesheet.root, {
    [stylesheet.isBlurred]: isMenuOpen,
  });

  const handleModule = (name) => {
    setActive(name);

    Module = Loadable({
      loader: () => import(`works/${name}`),
      loading: () => <Loading componentName={name} />,
    });

    setIsMenuOpen(false);
  };

  const handleMenuButtonClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFullscreenButtonClick = () => {
    setIsFullscreen(!isFullscreen);
  };

  /**
   * Show the NavBar when the mouse moves
   */
  const handleMouseMove = useCallback(() => {
    if (isMenuOpen) {
      setIsNavBarVisible(false);
      clearTimeout(mouseMoveTimeoutRef.current);
    } else {
      setIsNavBarVisible(true);
      clearTimeout(mouseMoveTimeoutRef.current);

      mouseMoveTimeoutRef.current = setTimeout(() => {
        setIsNavBarVisible(false);
      }, 1500);
    }
  }, [isMenuOpen]);

  const debouncedMouseMove = debounce(handleMouseMove);

  useEffect(() => {
    window.addEventListener('mousemove', debouncedMouseMove);
    return () => {
      window.removeEventListener('mousemove', debouncedMouseMove);
    };
  }, [debouncedMouseMove, handleMouseMove, isNavBarVisible]);

  return (
    <Fullscreen enabled={isFullscreen}>
      <div className={appClassList}>
        {active ? <Module /> : <EmptyState />}
        <NavBar
          isVisible={isNavBarVisible}
          handleFullscreenButtonClick={handleFullscreenButtonClick}
          handleMenuButtonClick={handleMenuButtonClick}
        />
      </div>
      <Modal showModal={isMenuOpen} toggleModal={handleMenuButtonClick}>
        <ul className={stylesheet.menu}>
          {availableWorks.map((name, idx) => (
            <li className={stylesheet.menuItem} key={idx}>
              <button
                onClick={() => handleModule(name)}
                className={cx(stylesheet.menuButton, {
                  [stylesheet.isActive]: active === name,
                })}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </Fullscreen>
  );
}

export default App;
