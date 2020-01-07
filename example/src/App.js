import React, { Component } from 'react';
import { openModal } from 'cb-react-modal';
import 'cb-react-modal/dist/modalStyle.css';
import './test.css';
import closeSrc from './twitter.svg'

export default class App extends Component {

  // componentDidMount() {
  //   this.openModal();
  // }

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
    });
  };

  inner = () => {
    openModal({
      head: 'Yet another inner modal',
      body: 'A bogus body',
      closeOnEscape: false,
    })
  }

  render() {
    return (
      <div>
        <h1>Modal demo</h1>
        <button onClick={this.openModal}>Show</button>
      </div>
    );
  }
}
