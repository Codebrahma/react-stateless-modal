import React, { Component } from "react";
import closeIcon from "../images/cross.svg";

class Modal extends Component {
  state = {
    closed: false
  };

  handleClose = () => {
    this.setState({ closed: true });
    setTimeout(() => {
      this.removeElement(this.props.id);
    }, 250);
    this.removeListener();
  };

  addListener = () => {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("mousedown", this.handleMouseDown, false);
  };

  removeListener = () => {
    document.removeEventListener("keydown", this.handleKeyDown, false);
    document.removeEventListener("mousedown", this.handleMouseDown, false);
  };

  componentDidMount() {
    this.addListener();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  removeElement = id => {
    this.setState({ closed: false });
    const element = document.querySelector(`#modal${id}`);
    element.parentNode.removeChild(element);
  };

  handleKeyDown = e => {
    const { closeOnEscape } = this.props;
    if (closeOnEscape === false) return;
    const ESCAPE_KEY_CODE = 27;
    if (e.keyCode === ESCAPE_KEY_CODE) this.handleClose();
  };

  handleMouseDown = e => {
    const { className } = e.target;
    if (className === "modal") this.handleClose();
  };

  render() {
    const {
      head,
      body,
      footer,
      styles,
      id,
      clsName,
      closeOnEscape
    } = this.props;
    const { closed } = this.state;
    return (
      <div
        className={closed ? `modal modal-close` : `modal`}
        id={id}
        onKeyDown={this.handleDown}
        tabIndex="0"
      >
        {closeOnEscape ? <div className="close-modal" onClick={this.handleClose}>
          <img src={closeIcon} alt="close button" />
          <p>(Esc)</p>
        </div> : null}
        <section
          className={
            closed ? "modal-main modal-main-close" : `modal-main ${clsName}`
          }
          style={styles}
        >
          <img src={closeIcon} alt="close button" onClick={this.handleClose} />
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
