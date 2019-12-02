import React, { Component } from "react";
import close from "../images/cross.svg";

class Modal extends Component {
  handleClose = () => {
    const { id } = this.props;
    this.removElement(id);
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  removElement = id => {
    const element = document.querySelector(`#modal${id}`);
    element.parentNode.removeChild(element);
  };

  handleClick = e => {
    const { className, id } = e.target;
    if (className === "modal") {
      // this.removElement(id);
      // console.log(id);
    }
  };

  render() {
    const { head, body, footer, styles, id } = this.props;
    return (
      <div className="modal" id={id}>
        <section className="modal-main" style={styles}>
          <img src={close} alt="close button" onClick={this.handleClose} />
          {typeof head === "string" ? <h2>{head}</h2> : head}
          <div className="body">
            {typeof body === "string" ? <p>{body}</p> : body}
          </div>
          <div className="footer">
            {typeof footer === "string" ? <p>{footer}</p> : footer}
          </div>
        </section>
      </div>
    );
  }
}

export default Modal;
