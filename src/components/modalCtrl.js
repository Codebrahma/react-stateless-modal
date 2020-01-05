import ReactDOM from 'react-dom';
import React from 'react';
import Modal from './modal';
import {getCurrentIndex, updateIndices} from './indexGenerator'


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
  // const rand = Math.floor(Math.random() * 100000 + 1);
  let index;
  if (getCurrentIndex) index = getCurrentIndex() + 1;
  else index = 1000;
  containerDomNode.setAttribute('id', `app-modal-${index}`);
  if (containerId) document.getElementById(containerId).appendChild(containerDomNode);
  else document.body.appendChild(containerDomNode);


  const determineElement = (element) => {
    if (element) return typeof element === 'string' ? element : element();
    return '';
  };

  ReactDOM.render(
    <Modal
      head={determineElement(head)}
      body={determineElement(body)}
      footer={determineElement(footer)}
      closeOnEscape={closeOnEscape}
      styles={styles}
      classNames={classNames}
      id={index}
      closeIcon={closeIcon}
      animation={animation}
    />,
    containerDomNode,
  );
};

export { Modal, openModal };
