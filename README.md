# cb-modal-lib

> A modal library that does not require state maintance

[![NPM](https://img.shields.io/npm/v/cb-modal-lib.svg)](https://www.npmjs.com/package/cb-modal-lib) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save cb-modal-lib
```

## Usage

```jsx
import React, { Component } from 'react'
import {open} from 'cb-modal-lib'
import "cb-modal-lib/dist/modalStyle.css";

openModal = () => {
  open({
    header: () => { // component or string to render header },
    body: () => { // component or string to render body },
    footer: () => { // component or string to render footer },
    styles: () => { // style object to add custom styles to the container}
  })
}

const App = () => (
  <button onClick={openModal}>Open Modal</button>
)
```

## License

MIT © [Sigkill32](https://github.com/Sigkill32)
