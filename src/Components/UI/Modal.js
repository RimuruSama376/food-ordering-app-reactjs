import React from "react";
import ReactDom from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  const location = document.getElementById("overlays");
  return (
    <>
      {ReactDom.createPortal(<Backdrop onClose={props.onClick} />, location)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        location
      )}
    </>
  );
};

export default Modal;
