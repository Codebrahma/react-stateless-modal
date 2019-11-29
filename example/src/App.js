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
