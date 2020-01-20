import React from "react";

export default React.createContext({
  movies: [],
  modalClose: () => {},
  removeMovie: () => {},
  setMovie: () => {},
  setModal: () => {}
});
