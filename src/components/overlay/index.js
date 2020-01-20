import React, { useRef, useContext } from "react";
import context from "../../_context";
import "./style.css";

const Overlay = ({ show }) => {
  const globalState = useContext(context);
  let overlay = useRef();
  if (!show) {
    return null;
  } else {
    return (
      <div
        className="overlay"
        onClick={() => globalState.modalClose()}
        ref={overlay}
        style={{ display: "block" }}
      ></div>
    );
  }
};

export default Overlay;
