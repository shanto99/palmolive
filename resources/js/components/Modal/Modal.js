import React from "react";
import ReactDOM from "react-dom";


import "./modal.css";


class Modal extends React.Component {
  constructor(props)
  {
    super(props);
    this.rootElement = document.getElementById("modal-root");
    this.modalEl = document.createElement("div");
    this.modalEl.classList.add("modal-container");
    this.modalBody = document.createElement("div");
    this.modalBody.classList.add('modal-body');

    this.modalEl.append(this.modalBody);
  }

  componentDidMount()
  {
    this.rootElement.append(this.modalEl);

    this.modalEl.addEventListener('click', (e) => {
      if(!this.modalBody.contains(e.target)) {
        if(this.props.closeCb) this.props.closeCb();
      }
    });
  }

  componentWillUnmount()
  {
    this.rootElement.removeChild(this.modalEl);
  }

  render()
  {
    return ReactDOM.createPortal(
      this.props.children,
      this.modalBody)
  }

}


export default Modal;