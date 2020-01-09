import React, { Component } from 'react';
import PropTypes from 'prop-types';
import crossIcon from '../images/cross.svg';
import styles from '../styles/modalStyle.css';


class CBModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: false,
    };
  }

  componentDidMount() {
    CBModal.instances.push({ instance: this });
    if (CBModal.instances.length === 1) {
      document.addEventListener('keydown', this.handleKeyDown, false);
    }
  }

  handleClose = () => {
    this.closeOverlay();
  };

  closeOverlay = () => {
    const { componentMode, onClose } = this.props;
    this.setState({ closed: true });
    if (componentMode === undefined) {
      onClose();
    }
    setTimeout(() => {
      const { id } = this.props;
      this.unmountModal(id);
    }, 250);
  };

  unmountModal = (id) => {
    const element = document.querySelector(`#app-modal-${id}`);
    element.parentNode.removeChild(element);
    CBModal.instances.pop();
    if (CBModal.instances.length === 0) {
      document.removeEventListener('keydown', this.handleKeyDown, false);
    }
  };

  handleKeyDown = (e) => {
    const ESCAPE_KEY_CODE = 27;
    const lastInstance = CBModal.instances[CBModal.instances.length - 1].instance;
    if (
      e.keyCode === ESCAPE_KEY_CODE
      && CBModal.instances.length > 0
      && lastInstance.props.closeOnEscape
    ) {
      lastInstance.closeOverlay();
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
      this.closeOverlay();
    }
  };

  static instances = [];

  render() {
    const {
      head,
      body,
      footer,
      id,
      classNames,
      animation,
      closeIcon,
    } = this.props;
    const { closed } = this.state;

    return (
      <div className="modal-component">
        <div
          className={
              closed
                ? `${this.classNameDeterminer('overlay')} ${
                  styles['modal-overlay-close']
                }`
                : this.classNameDeterminer('overlay')
            }
          id={id}
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
            {head ? (
              <div className={styles.head}>
                {typeof head === 'string' ? <h2>{head}</h2> : head}
              </div>
            ) : null}
            {body ? (
              <div className={styles.body}>
                {typeof body === 'string' ? <p>{body}</p> : body}
              </div>
            ) : null}
            {footer ? (
              <div className={styles.footer}>
                {typeof footer === 'string' ? <p>{footer}</p> : footer}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CBModal.defaultProps = {
  head: null,
  body: null,
  footer: null,
  styles: null,
  classNames: { overlay: '', modal: '', closeIcon: '' },
  closeIcon: null,
  animation: { name: 'fade-in', duration: '500ms' },
  id: null,
  componentMode: undefined,
  onClose: null,
};

CBModal.propTypes = {
  head: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  styles: PropTypes.shape({}),
  id: PropTypes.number,
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
  componentMode: PropTypes.bool,
  onClose: PropTypes.func,
};


export default CBModal;
