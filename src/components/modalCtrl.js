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
      head={typeof head === 'string' ? head : head()}
      body={typeof body === 'string' ? body : body()}
      footer={typeof footer === 'string' ? footer : footer()}
      closeOnEscape={closeOnEscape}
      styles={styles}
      clsName={clsName}
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
  clsName: null
};

openModal.propTypes = {
  head: propTypes.func,
  body: propTypes.func,
  footer: propTypes.func,
  closeOnEscape: propTypes.string,
  styles: propTypes.shape({}),
  clsName: propTypes.shape({})
};

export { Modal, openModal };
