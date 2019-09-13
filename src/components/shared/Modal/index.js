import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';

import Portal from 'components/shared/Portal';
import { ReactComponent as CloseIcon } from 'icons/close.svg';

import stylesheet from './Modal.module.css';

const Modal = ({ children, showModal, toggleModal }) => {
  const contentRef = useRef(null);

  const modalTransition = useTransition(showModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <Portal>
      {modalTransition.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div
              className={stylesheet.modal}
              key={key}
              style={props}
              aria-modal="true"
              role="dialog"
            >
              <animated.div className={stylesheet.content} ref={contentRef}>
                <div className={stylesheet.innerContent}>{children}</div>
                <button
                  aria-label="Close"
                  className={stylesheet.closeButton}
                  onClick={toggleModal}
                >
                  <CloseIcon title="Close" />
                </button>
              </animated.div>
              <div className={stylesheet.background} onClick={toggleModal} />
            </animated.div>
          )
        );
      })}
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
