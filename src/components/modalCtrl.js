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

  const determineProp = (prop) => {
    if (prop) return typeof prop === 'string' ? prop : prop();
    return '';
  };

  ReactDOM.render(
    <Modal
      head={determineProp(head)}
      body={determineProp(body)}
      footer={determineProp(footer)}
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
