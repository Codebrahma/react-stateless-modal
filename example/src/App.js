import React, { Component } from 'react';
import { openModal, Modal, closeModal } from 'react-simple-modal';
import './test.css';
import closeSrc from './twitter.svg'

export default class App extends Component {

  state = {
    open: false
  }

  openModal = () => {
    openModal({
      head: () => <h2>Random Heading</h2>,
      body: () => (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
      ),
      footer: () => (
        <button onClick={this.openInnerModal}>Open Inner Modal</button>
      ),
      // containerId: 'modals',
      animation: {name: 'zoom-in', duration: '250ms'},
    });
  };

  openInnerModal = () => {
    openModal({
      head: 'Inner Heading',
      body: () => <p>Inner Body  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam</p>,
      footer: () => <button onClick={this.inner}>Inner</button>,
      closeIcon: { src: closeSrc, alt:'close' },
      classNames: {overlay: 'overlay', modal: 'mod', closeIcon: 'ico'},
      modalId: 69420
    });
  };

  inner = () => {
    openModal({
      head: 'Yet another inner modal',
      body: 'A bogus body',
      closeOnEscape: false,
      footer: () => <button onClick={closeModal}>close</button>,
      modalId: 42069
    })
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  render() {
    const {open} = this.state;
    return (
      <div>
        <h1>Modal demo</h1>
        <button onClick={this.openModal}>Open Modal via function mode</button>
        <button onClick={this.handleOpen}>Open Modal via Component mode</button>
        {/* <Modal head="head" onClose={this.handleClose} open={open} animation={{ name: "bounce", duration: "500ms" }}/> */}
        <Modal onClose={this.handleClose} open={open} head="Test" body={() => <button onClick={closeModal}>close</button>}/>
      </div>
    );
  }
}
