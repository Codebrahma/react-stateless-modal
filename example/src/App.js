import React, { Component } from "react";
import { openModal } from "cb-react-modal";
import "cb-react-modal/dist/modalStyle.css";
import "./test.css";

export default class App extends Component {
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
      )
    });
  };

  openInnerModal = () => {
    openModal({
      head: () => "Inner Heading",
      body: () => <p>Inner Body</p>,
      footer: () => <p>Inner Footer</p>,
      styles: () => ({ width: " 30%" }),
      clsName: () => "test"
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
