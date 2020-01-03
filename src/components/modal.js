import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../images/cross.svg';
import styles from '../styles/modalStyle.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('mousedown', this.handleMouseDown, false);
  }

  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = () => {
    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('mousedown', this.handleMouseDown, false);
  };

  handleClose = () => {
    this.setState({ closed: true });
    setTimeout(() => {
      const { id } = this.props;
      this.unmountModal(id);
    }, 250);
    this.removeListener();
  };

  unmountModal = (id) => {
    this.setState({ closed: false });
    const element = document.querySelector(`#app-modal-${id}`);
    element.parentNode.removeChild(element);
  };

  handleKeyDown = (e) => {
    const { closeOnEscape } = this.props;
    if (closeOnEscape === false) return;
    const ESCAPE_KEY_CODE = 27;
    if (e.keyCode === ESCAPE_KEY_CODE) this.handleClose();
  };

  handleMouseDown = (e) => {
    const { className } = e.target;
    if (className.includes('modal-overlay')) this.handleClose();
  };

  render() {
    const {
      head,
      body,
      footer,
      id,
      classNames,
      animation,
      closeIcon: closeIco,
    } = this.props;
    const { closed } = this.state;
    return (
      <div
        className={`${styles['modal-overlay']}${
          classNames.overlay ? ` ${classNames.overlay}` : ''
        }${closed ? styles['modal-overlay-close'] : ''}`}
        id={id}
        onKeyDown={this.handleDown}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex="0"
      >
        <div
          className={`${styles['modal-content']}${
            classNames.modal ? ` ${classNames.modal}` : ''
          }${closed ? styles['modal-content-close'] : ''}`}
          style={{ animation: `${animation.name} ${animation.duration}` }}
        >
          {closeIco ? (
            <button onClick={this.handleClose} type="button">
              <img
                src={closeIco.src}
                alt={closeIco.alt}
                className={classNames.closeIcon}
              />
            </button>
          ) : (
            <button onClick={this.handleClose} type="button">
              <img
                src={closeIcon}
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
    src: PropTypes.object,
    alt: PropTypes.string,
  }),
  classNames: PropTypes.shape({
    overlay: PropTypes.string,
    modal: PropTypes.string,
    closeIcon: PropTypes.string,
  }),
};

export default Modal;
