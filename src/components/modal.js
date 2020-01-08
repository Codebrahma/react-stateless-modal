import React, { Component } from 'react';
import PropTypes from 'prop-types';
import crossIcon from '../images/cross.svg';
import styles from '../styles/modalStyle.css';

class Modal extends Component {
  static instances = [];

  constructor(props) {
    super(props);
    this.state = {
      closed: false
    };
  }

  componentDidMount() {
    Modal.instances.push({ instance: this });
    if (Modal.instances.length === 1) {
      document.addEventListener('keydown', this.handleKeyDown, false);
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = () => {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  handleClose = () => {
    this.closeOverlay();
  };

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    if (open !== prevProps.open) {
      if (!open)
      setTimeout(() => {
        this.setState(prevState => ({closed: !prevState.closed}));
      })
    }
  }

  closeOverlay = () => {
    const { componentMode, onClose } = this.props;
    this.setState({ closed: true });
    if (componentMode === undefined) {
      onClose();
    }
    setTimeout(() => {
      const DEFAULT_ID = 42069;
      const {id} = this.props;
      this.unmountModal(componentMode === undefined ? DEFAULT_ID : id);
    }, 250);
    Modal.instances.pop();
    if (Modal.instances.length === 0) {
      this.removeListener();
    }
  };

  unmountModal = id => {
    const {componentMode} = this.props;
    if (componentMode === undefined) {
      return;
    }
    const element = document.querySelector(`#app-modal-${id}`);
    element.parentNode.removeChild(element);
  };

  handleKeyDown = e => {
    const ESCAPE_KEY_CODE = 27;
    const lastInstance = Modal.instances[Modal.instances.length - 1].instance;
    if (
      e.keyCode === ESCAPE_KEY_CODE &&
      Modal.instances.length > 0 &&
      lastInstance.props.closeOnEscape
    ) {
      lastInstance.closeOverlay();
    }
  };

  classNameDeterminer = type => {
    const { classNames } = this.props;
    return `${styles[type === 'overlay' ? 'modal-overlay' : 'modal-content']} ${
      classNames[type]
    }`;
  };

  handleOverlayClick = e => {
    const { id } = e.target;
    if (id) {
      this.closeOverlay();
    }
  };

  render() {
    const {
      head,
      body,
      footer,
      id,
      classNames,
      animation,
      closeIcon,
      componentMode,
      open
    } = this.props;
    const { closed } = this.state;

    return (
      <div className="modal-component">
        {open ? <div
        className={
          closed
            ? `${this.classNameDeterminer('overlay')} ${
                styles['modal-overlay-close']
              }`
            : this.classNameDeterminer('overlay')
        }
        id={componentMode === undefined ? `app-modal-${42069}` : id}
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
          <button
            onClick={this.handleClose}
            type="button"
            className={styles.closeButton}
          >
            {closeIcon ? (
              <img
                src={closeIcon.src}
                alt={closeIcon.alt}
                className={classNames.closeIcon}
              />
            ) : (
              <img
                src={crossIcon}
                alt="close"
                className={classNames.closeIcon}
              />
            )}
          </button>
          <div className={styles['head']}>
            {typeof head === 'string' ? <h2>{head}</h2> : head}
          </div>
          <div className={styles['body']}>
            {typeof body === 'string' ? <p>{body}</p> : body}
          </div>
          <div className={styles['footer']}>
            {typeof footer === 'string' ? <p>{footer}</p> : footer}
          </div>
        </div>
      </div> : null}
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
  id: null
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
    duration: PropTypes.string
  }),
  closeIcon: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string
  }),
  classNames: PropTypes.shape({
    overlay: PropTypes.string,
    modal: PropTypes.string,
    closeIcon: PropTypes.string
  })
};

export default Modal;
