import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../images/cross.svg';

class Modal extends Component {

  state = {
    closed: false
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('mousedown', this.handleMouseDown, false);
  }

  componentWillUnmount() {
    this.removeListener();
  }

  handleClose = () => {
    this.setState({ closed: true });
    setTimeout(() => {
      this.removeElement(this.props.id);
      F;
    }, 250);
    this.removeListener();
  };

  removeListener = () => {
    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('mousedown', this.handleMouseDown, false);
  };

  removeElement = id => {
    this.setState({ closed: false });
    const element = document.querySelector(`#app-modal-${id}`);
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
    if (className === 'modal') this.handleClose();
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
        className={`modal${closed ? ' modal-close' : ''}`}
        id={id}
        onKeyDown={this.handleDown}
        tabIndex="0"
      >
        {closeOnEscape ? (
          <div className="close-modal" onClick={this.handleClose}>
            <img src={closeIcon} alt="close" />
            <p>(Esc)</p>
          </div>
        ) : null}
        <section
          className={`modal-main${
            closed ? ' modal-main-close' : ` ${clsName}`
          }`}
          style={styles}
        >
          <img src={closeIcon} alt="close" onClick={this.handleClose} />
          {typeof head === 'string' ? <h2>{head}</h2> : head}
          <div className="body">
            {typeof body === 'string' ? <p>{body}</p> : body}
          </div>
          <div className="footer">
            {typeof footer === 'string' ? <p>{footer}</p> : footer}
          </div>
        </section>
      </div>
    );
  }
}

Modal.prototypes = {
  head: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  styles: PropTypes.object,
  id: PropTypes.number,
  clsName: PropTypes.string,
  closeOnEscape: PropTypes.bool
};

export default Modal;
