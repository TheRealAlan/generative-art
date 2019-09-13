import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const portalRoot = document.getElementById('portal');

const Portal = ({ children }) => {
  return createPortal(children, portalRoot);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
