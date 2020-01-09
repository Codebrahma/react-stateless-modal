import ReactDOM from 'react-dom';
import React from 'react';
import CBModal from './cbModal';
import modalStyles from '../styles/modalStyle.css';
import generateContainer from './containerGenerator';

const openModal = (contents) => {
  const {
    head,
    body,
    footer,
    styles,
    classNames,
    closeOnEscape,
    closeIcon,
    containerId,
    animation,
    modalId,
    disableOverlayClick,
  } = contents;

  const { containerDomNode, rand } = generateContainer(modalId, containerId);

  const determineElement = (element) => {
    if (element) return typeof element === 'string' ? element : element();
    return '';
  };

  let componentMode = true;
  if (contents) componentMode = false;

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
      componentMode={componentMode}
      disableOverlayClick={disableOverlayClick}
    />,
    containerDomNode,
  );
};

const findIndex = (id) => {
  for (let i = 0; i < CBModal.instances.length; i += 1) {
    if (id === CBModal.instances[i].instance.props.id) return i;
  }
  return null;
};

const removeModal = (id, instance) => {
  const className = `${document.getElementById(id).className} ${
    modalStyles['modal-overlay-close']
  }`;
  document.getElementById(id).className = className;
  setTimeout(() => {
    instance.unmountModal(id);
  }, 250);
};

const closeModal = (...args) => {
  if (typeof args[0] === 'number') {
    for (let i = 0; i < args.length; i += 1) {
      const index = findIndex(args[i]);
      removeModal(args[i], CBModal.instances[index].instance);
    }
  } else {
    const lastInstance = CBModal.instances[CBModal.instances.length - 1].instance;
    const lastId = lastInstance.props.id;
    removeModal(lastId, lastInstance);
  }
};

export { CBModal, openModal, closeModal };
