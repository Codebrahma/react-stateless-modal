import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import generateContainer from './containerGenerator';
import CBModal from './cbModal';

const renderModal = (props) => {
  const {
    head,
    body,
    footer,
    closeOnEscape,
    styles,
    classNames,
    closeIcon,
    animation,
    modalId,
    containerId,
    onClose,
    disableOverlayClick,
  } = props;
  const { containerDomNode, rand } = generateContainer(modalId, containerId);
  const determineElement = (element) => {
    if (element) return typeof element === 'string' ? element : element();
    return '';
  };
  ReactDOM.render(
    <CBModal
      head={determineElement(head)}
      body={determineElement(body)}
      footer={determineElement(footer)}
      closeOnEscape={closeOnEscape === undefined ? true : closeOnEscape}
      styles={styles}
      classNames={classNames}
      id={rand}
      closeIcon={closeIcon}
      animation={animation}
      componentMode={undefined}
      onClose={onClose}
      disableOverlayClick={disableOverlayClick}
    />,
    containerDomNode,
  );
};


const Modal = ({ open, ...rest }) => (
  // eslint-disable-next-line react/jsx-fragments
  open ? <React.Fragment>{renderModal(rest)}</React.Fragment> : null
);

export default Modal;

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
};
