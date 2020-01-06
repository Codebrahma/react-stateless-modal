import React, { Component } from 'react';
import PropTypes from 'prop-types';
import crossIcon from '../images/cross.svg';
import styles from '../styles/modalStyle.css';

class Modal extends Component {
  static ids = [];

  constructor(props) {
    super(props);
    this.state = {
      closed: false,
    };
  }

  componentDidMount() {
    if (Modal.ids.length === 1)  { 
      document.addEventListener('keydown', this.handleKeyDown, false);
    }
  }

  componentWillUnmount() {
    this.removeListner();
  }

  removeListner = () => {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  handleDown = () => {
    const lastId = Modal.ids[Modal.ids.length - 1];
    this.closeOverlayById(lastId);
  }

  handleClose = () => {
    const { id } = this.props;
    this.closeOverlayById(id);
  };

  closeOverlayById = (id) => {
    this.setState({ closed: true });
    setTimeout(() => {
      this.unmountModal(id);
    }, 250);
    Modal.ids.pop();
    if (Modal.ids.length === 0) {
      this.removeListner();
    }
  };

  unmountModal = (id) => {
    const element = document.querySelector(`#app-modal-${id}`);
    element.parentNode.removeChild(element);
  };

  handleKeyDown = (e) => {
    const { closeOnEscape } = Modal.ids[Modal.ids.length - 1];
    if (closeOnEscape === false) return;
    const ESCAPE_KEY_CODE = 27;
    if (e.keyCode === ESCAPE_KEY_CODE) {
      const lastId = Modal.ids[Modal.ids.length - 1].id;
      this.closeOverlayById(lastId);
    }
  };

  classNameDeterminer = (type) => {
    const { classNames } = this.props;
    return `${styles[type === 'overlay' ? 'modal-overlay' : 'modal-content']} ${
      classNames[type]
    }`;
  };

  handleOverlayClick = (e) => {
    const { id } = e.target;
    if (id) {
      this.closeOverlayById(id)
    };
  };

  render() {
    const {
      head,
      body,
      footer,
      id,
      classNames,
      animation,
      closeIcon
    } = this.props;
    const { closed } = this.state;

    return (
      <div
        className={
          closed
            ? `${this.classNameDeterminer('overlay')} ${
              styles['modal-overlay-close']
            }`
            : this.classNameDeterminer('overlay')
        }
        id={id}
        tabIndex="0"
        onClick={this.handleOverlayClick}
      >
        <div
          className={
            closed
              ? `${this.classNameDeterminer('modal')} ${
                styles['modal-content-close']
              }`
              : this.classNameDeterminer('modal')
          }
          style={{ animation: `${animation.name} ${animation.duration}` }}
        >
          {closeIcon ? (
            <button
              onClick={this.handleClose}
              type="button"
              className={styles.closeButton}
            >
              <img
                src={closeIcon.src}
                alt={closeIcon.alt}
                className={classNames.closeIcon}
              />
            </button>
          ) : (
            <button
              onClick={this.handleClose}
              type="button"
              className={styles.closeButton}
            >
              <img
                src={crossIcon}
                alt="close"
                className={classNames.closeIcon}
              />
            </button>
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
  animation: { name: 'fade-in', duration: '500ms' },
  id: null,
};

Modal.propTypes = {
  head: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  styles: PropTypes.shape({}),
  id: PropTypes.number,
  closeOnEscape: PropTypes.bool,
  animation: PropTypes.shape({
    name: PropTypes.string,
    duration: PropTypes.string,
  }),
  closeIcon: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  classNames: PropTypes.shape({
    overlay: PropTypes.string,
    modal: PropTypes.string,
    closeIcon: PropTypes.string,
  }),
};

export default Modal;
