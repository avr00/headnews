import React from "react";

import "./Modal.scss";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default Modal;
