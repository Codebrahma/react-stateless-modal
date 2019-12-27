import ReactDOM from "react-dom";
import React from "react";
import Modal from "./modal.jsx";

const openModal = contents => {
  const { head, body, footer, styles, clsName, closeOnEscape } = contents;
  const containerDomNode = document.createElement("div");
  const rand = Math.floor(Math.random() * 100000 + 1);
  containerDomNode.setAttribute("id", `modal${rand}`);
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

export { Modal, openModal };
