# cb-modal-lib

> A modal library that does not require state maintance

[![NPM](https://img.shields.io/npm/v/cb-modal-lib.svg)](https://www.npmjs.com/package/cb-modal-lib) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save cb-modal-lib
```
## Advantages
Create modals wherever you want without having to maintain state variables.

## Usage

```jsx
import React, { Component } from 'react'
import {open} from 'cb-modal-lib'
import "cb-modal-lib/dist/modalStyle.css";

class Example extends Component {
  openModal = () => {
    open({
      header: () => { // component or string to render header },
      body: () => { // component or string to render body },
      footer: () => { // component or string to render footer },
      styles: () => { // style object to add custom styles to the container}
    })
  }
  render() {
    return <button onClick={this.openModal}>Open Modal</button>
  }
}

```

The open method will mount the container for you.

### Nested modal support
The library additionally gives you the flexibilty of mounting a modal container over an already existing modal. The example below describes the same

```jsx
import React, { Component } from "react";
import { open } from "cb-modal-lib";
import "cb-modal-lib/dist/modalStyle.css";

export default class App extends Component {
  openModal = () => {
    open({
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
      )
    });
  };

  openInnerModal = () => {
    open({
      head: () => "Inner Heading",
      body: () => <p>Inner Body</p>,
      footer: () => <p>Inner Footer</p>
    });
  };

  render() {
    return (
      <div>
        <h1>Modal demo</h1>
        <button onClick={this.openModal}>Show</button>
      </div>
    );
  }
}

```

## License

MIT © [Sigkill32](https://github.com/Sigkill32)
