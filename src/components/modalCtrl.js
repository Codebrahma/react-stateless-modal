import ReactDOM from 'react-dom';
import React from 'react';
import Modal from './modal';

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
    modalId
  } = contents;


  const containerDomNode = document.createElement('div');
  let rand;
  if (modalId) {
    rand = modalId;
  }
  else {
    rand = Math.floor(Math.random() * 100000 + 1);
    }
  containerDomNode.setAttribute('id', `app-modal-${rand}`);
  if (containerId) {
    document.getElementById(containerId).appendChild(containerDomNode);
  }
  else {
    document.body.appendChild(containerDomNode);
  }

  const determineElement = (element) => {
    if (element) return typeof element === 'string' ? element : element();
    return '';
  };

  let componentMode = true;
  if (contents) componentMode = false;


  ReactDOM.render(
    <Modal
      head={determineElement(head)}
      body={determineElement(body)}
      footer={determineElement(footer)}
      closeOnEscape={closeOnEscape === undefined ? true : closeOnEscape}
      styles={styles}
      classNames={classNames}
      id={rand}
      closeIcon={closeIcon}
      animation={animation}
      contents={contents}
      componentMode={componentMode}
      open={true}
    />,
    containerDomNode,
  );
};

const closeModal = (id) => {
  const element = document.querySelector(`#app-modal-${id}`);
  element.parentNode.removeChild(element);
}

export { Modal, openModal, closeModal };
