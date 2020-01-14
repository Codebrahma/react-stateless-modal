import React from 'react';
import ReactDOM from 'react-dom';
import generateContainer from './containerGenerator';
import CBModal from './cbModal';


const renderModal = (props) => {
  const {
    head,
    body,
    footer,
    styles,
    classNames,
    closeOnEscape,
    closeIcon,
    containerId,
    animation,
    modalId,
    disableOverlayClick,
  } = props;

  const { containerDomNode, rand } = generateContainer(modalId, containerId);

  const determineElement = (element) => {
    if (element) return typeof element === 'string' ? element : element();
    return '';
  };
  const componentMode = false;

  ReactDOM.render(
    <CBModal
      head={determineElement(head)}
      body={determineElement(body)}
      footer={determineElement(footer)}
      closeOnEscape={closeOnEscape === undefined ? true : closeOnEscape}
      styles={styles}
      classNames={classNames}
      id={rand}
      closeIcon={closeIcon}
      animation={animation}
      componentMode={componentMode}
      disableOverlayClick={disableOverlayClick}
    />,
    containerDomNode,
  );
};


const openModal = (props) =>
  // eslint-disable-next-line react/jsx-fragments
  (<React.Fragment>{renderModal(props)}</React.Fragment>);
export default openModal;
