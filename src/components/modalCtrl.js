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
  } = contents;

  const containerDomNode = document.createElement('div');
  const rand = Math.floor(Math.random() * 100000 + 1);
  containerDomNode.setAttribute('id', `app-modal-${rand}`);
  if (containerId) document.getElementById(containerId).appendChild(containerDomNode);
  else document.body.appendChild(containerDomNode);

  ReactDOM.render(
    <Modal
      head={typeof head === 'string' ? head : head()}
      body={typeof body === 'string' ? body : body()}
      footer={typeof footer === 'string' ? footer : footer()}
      closeOnEscape={closeOnEscape}
      styles={styles}
      classNames={classNames}
      id={rand}
      closeIcon={closeIcon}
      animation={animation}
    />,
    containerDomNode,
  );
};

export { Modal, openModal };
