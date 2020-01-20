import React, { useContext } from "react";
import context from "../../_context";

import "./style.css";

const Modal = ({ show, title, buttons, children }) => {
  const globalState = useContext(context);

  if (!show) {
    return null;
  } else {
    return (
      <div className="modal">
        <div className="modal-header">
          <div className="model-title">{title ? title : null}</div>
          <a
            href="#close"
            className="modal-close"
            onClick={() => globalState.modalClose()}
          >
            ×
          </a>
        </div>
        <div className="modal-content">{children ? children : null}</div>
        <div className="modal-footer">{buttons ? buttons : null}</div>
      </div>
    );
  }
};

export default Modal;
