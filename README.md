# simple-react-modal

> A modal library that does not require state maintenance

[![NPM](https://img.shields.io/npm/v/simple-react-modal.svg)](https://www.npmjs.com/package/simple-react-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save simple-react-modal
```

## documentation

https://cb-react-modal-docs.netlify.com/

## Advantages

Create modals wherever you want without having to maintain state variables.

## Motivation

The modal libraries in existence such as `react-responsive-modal` requires users to maintain state variables for the creation of each modal, which can become painful while maintaining a large codebase that involves multiple modals. This library eliminates the above problem and lets users create modals without having to create and maintain state variables.

## Usage

```jsx
import React, { Component } from "react";
import { openModal } from "simple-react-modal";
class Example extends Component {
  openModal = () => {
    openModal({
      header: () => (
        /* component or string to render header */
      ),
      body: () => (
        /* component or string to render body */
      ),
      footer: () => (
        /* component or string to render footer */
      ),
      classNames: { overlay: className for overlay, modal: className for the modal, closeIcon: className for close icon},
      closeOnEscape: /* Setting true closes the modal on pressing escape key setting false does the opposite (Optional)*/,
      closeIcon: { src: IconObject, alt: alt text for the icon},
      animation: { name: choose from 'bounce', 'fade-in' and 'zoom' animation, duration: 'animationDuration'},
      containerId: /* Id of the custom container over which you would like the modal to be mounted */
      modalId: { /* make the modal take the id of your choosing */}
    });
  };
  render() {
    return <button onClick={this.openModal}>Open Modal</button>;
  }
}
```

The `openModal` method will mount the container for you.

You may optionally choose to use the component mode of the library by importing and mounting the `Modal` component. you may use all the properties used in the object passed to the `openModal` function. The example below shows how to create a simple modal using component mode. You additionally need to pass `open` and `onClose` prop. Refer docs for more information.

```jsx
import React, { Component } from "react";
import "./styles.css";
import { Modal } from "simple-react-modal";

class App extends Component {
  state = {
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <button onClick={this.handleOpen}>Open Modal via Component mode</button>
        <Modal
          head="head"
          body="Inner Body  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          onClose={this.handleClose}
          open={open}
        />
      </div>
    );
  }
}

export default App;
```

### Nested modal support

The library additionally gives you the flexibility of mounting a modal container over an already existing modal. The example below describes the same

```jsx
import React, { Component } from 'react';
import { openModal } from 'simple-react-modal';

export default class App extends Component {
  openModal = () => {
    openModal({
      head: () => <h2>Random Heading</h2>,
      body: () => (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
          hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
        </p>
      ),
      footer: () => <button onClick={this.openInnerModal}>Open Inner Modal</button>
    });
  };

  openInnerModal = () => {
    openModal({
      head: () => 'Inner Heading',
      body: () => <p>Inner Body</p>,
      footer: () => <p>Inner Footer</p>
    });
  };

  render() {
    return <button onClick={this.openModal}>Show</button>;
  }
}
```

## License

MIT © [Sigkill32](https://github.com/Sigkill32)
