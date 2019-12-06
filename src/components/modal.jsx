import React, { Component } from "react";
import close from "../images/cross.svg";

class Modal extends Component {
  state = {
    closed: false
  };

  handleClose = () => {
    this.setState({ closed: true });
    setTimeout(() => {
      this.removElement(this.props.id);
    }, 250);
    document.removeEventListener("keydown", this.handleKeyDown, false);
    document.removeEventListener("mousedown", this.handleMouseDown, false);
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("mousedown", this.handleMouseDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
    document.removeEventListener("mousedown", this.handleMouseDown, false);
  }

  removElement = id => {
    this.setState({ closed: false });
    const element = document.querySelector(`#modal${id}`);
    element.parentNode.removeChild(element);
  };

  handleKeyDown = e => {
    if (e.keyCode === 27) this.handleClose();
  };

  handleMouseDown = e => {
    const { className, id } = e.target;
    if (className === "modal") this.handleClose();
  };

  render() {
    const { head, body, footer, styles, id, clsName } = this.props;
    const { closed } = this.state;
    return (
      <div
        className={closed ? `modal modal-close` : `modal ${clsName}`}
        id={id}
        onKeyDown={this.handleDown}
        tabIndex="0"
      >
        <div className="close-modal" onClick={this.handleClose}>
          <img src={close} alt="close button" />
          <p>(Esc)</p>
        </div>
        <section
          className={
            closed ? "modal-main modal-main-close" : `modal-main ${clsName}`
          }
          style={styles}
        >
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
