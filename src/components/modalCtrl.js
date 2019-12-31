import ReactDOM from 'react-dom';
import React from 'react';
import propTypes from 'prop-types';
import Modal from './modal';

const openModal = contents => {
  const {
    head,
    body,
    footer,
    styles,
    classNames,
    closeOnEscape,
    closeIcon
  } = contents;
  const containerDomNode = document.createElement('div');
  const rand = Math.floor(Math.random() * 100000 + 1);
  containerDomNode.setAttribute('id', `app-modal-${rand}`);
  document.body.appendChild(containerDomNode);

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
    />,
    containerDomNode
  );
};

openModal.propTypes = {
  head: propTypes.oneOfType([propTypes.func, propTypes.string]).isRequired,
  body: propTypes.oneOfType([propTypes.func, propTypes.string]).isRequired,
  footer: propTypes.oneOfType([propTypes.func, propTypes.string]).isRequired,
  closeOnEscape: propTypes.string,
  styles: propTypes.shape({}),
  classNames: propTypes.shape({
    overlay: propTypes.string,
    modal: propTypes.string,
    closeIcon: propTypes.string
  }),
  closeIcon: propTypes.shape({
    src: propTypes.string,
    alt: propTypes.string
  })
};

export { Modal, openModal };
