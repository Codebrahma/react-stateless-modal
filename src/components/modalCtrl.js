import ReactDOM from 'react-dom';
import React from 'react';
import propTypes from 'prop-types';
import Modal from './modal';

const openModal = contents => {
  const { head, body, footer, styles, clsName, closeOnEscape } = contents;
  const containerDomNode = document.createElement('div');
  const rand = Math.floor(Math.random() * 100000 + 1);
  containerDomNode.setAttribute('id', `app-modal-${rand}`);
  document.body.appendChild(containerDomNode);

  ReactDOM.render(
    <Modal
      head={head()}
      body={body()}
      footer={footer()}
      closeOnEscape={closeOnEscape ? closeOnEscape() : true}
      styles={styles ? styles() : null}
      clsName={clsName ? clsName() : null}
      id={rand}
    />,
    containerDomNode
  );
};

openModal.defaultProps = {
  head: '',
  body: '',
  footer: '',
  closeOnEscape: true,
  styles: null,
  clsName: null,
  id: null
};

openModal.propTypes = {
  head: propTypes.func,
  body: propTypes.func,
  footer: propTypes.func,
  closeOnEscape: propTypes.func,
  styles: propTypes.func,
  clsName: propTypes.func,
  id: propTypes.number
};

export { Modal, openModal };
