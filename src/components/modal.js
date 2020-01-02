import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../images/cross.svg';
import styles from '../styles/modalStyle.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: false
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('mousedown', this.handleMouseDown, false);
    console.log(styles);
  }

  componentWillUnmount() {
    this.removeListener();
  }

  handleClose = () => {
    this.setState({ closed: true });
    setTimeout(() => {
      this.unmountModal(this.props.id);
      F;
    }, 250);
    this.removeListener();
  };

  removeListener = () => {
    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('mousedown', this.handleMouseDown, false);
  };

  unmountModal = id => {
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
    if (className.includes('modal-overlay')) this.handleClose();
  };

  render() {
    const { head, body, footer, id, classNames, animation } = this.props;
    const { closed } = this.state;
    return (
      <div
        className={
          closed
            ? `${styles['modal-overlay']} ${styles['modal-overlay-close']}`
            : classNames.overlay
            ? `${styles['modal-overlay']} ${classNames.overlay}`
            : styles['modal-overlay']
        }
        id={id}
        onKeyDown={this.handleDown}
        tabIndex="0"
      >
        <div
          className={
            closed
              ? `${styles['modal-content']} ${styles['modal-content-close']}`
              : classNames.modal
              ? `${styles['modal-content']} ${classNames.modal}`
              : styles['modal-content']
          }
          style={{ animation: `${animation.name} ${animation.duration}` }}
        >
          {this.props.closeIcon ? (
            <img
              src={this.props.closeIcon.src}
              alt={this.props.closeIcon.alt}
              onClick={this.handleClose}
              className={classNames.closeIcon}
            ></img>
          ) : (
            <img
              src={closeIcon}
              alt="close"
              onClick={this.handleClose}
              className={classNames.closeIcon}
            />
          )}
          {typeof head === 'string' ? <h2>{head}</h2> : head}
          <div className="body">
            {typeof body === 'string' ? <p>{body}</p> : body}
          </div>
          <div className="footer">
            {typeof footer === 'string' ? <p>{footer}</p> : footer}
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  head: '',
  body: '',
  footer: '',
  closeOnEscape: true,
  styles: null,
  classNames: { overlay: '', modal: '', closeIcon: '' },
  closeIcon: null,
  animation: { name: 'fade-in', duration: '500ms' }
};

Modal.prototypes = {
  head: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  styles: PropTypes.object,
  id: PropTypes.number,
  closeOnEscape: PropTypes.bool
};

export default Modal;
