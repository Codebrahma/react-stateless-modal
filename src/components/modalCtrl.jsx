import Modal from "./modal.jsx";
import ReactDOM from "react-dom";
import React from "react";

const open = contents => {
  const { head, body, footer, styles, clsName } = contents;
  const containerDomNode = document.createElement("div");
  const rand = Math.floor(Math.random() * 100000 + 1);
  containerDomNode.setAttribute("id", `modal${rand}`);
  document.body.appendChild(containerDomNode);
  ReactDOM.render(
    <Modal
      head={head()}
      body={body()}
      footer={footer()}
      styles={styles ? styles() : null}
      clsName={clsName ? clsName() : null}
      id={rand}
    />,
    containerDomNode
  );
};

export { Modal, open };
