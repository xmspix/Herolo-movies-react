import React, { useContext, useRef } from "react";
import "./style.css";
import context from "../../_context";

import { validator, msgText } from "../../util/functions";

import { modalForm } from "../../util/modal";

const MovieCard = () => {
  const globalState = useContext(context);

  const msg = useRef();
  const title = useRef();
  const year = useRef();
  const runtime = useRef();
  const genre = useRef();
  const director = useRef();

  const ref = { msg, title, year, runtime, genre, director };

  const edit = movie => {
    validator(globalState.movies, ref, movie).then(movie => {
      if (movie.error) msgText(movie.error, msg);
      else {
        globalState.setMovie(movie);
      }
    });
  };

  const save = () => {
    validator(globalState.movies, ref).then(movie => {
      if (movie.error) msgText(movie.error, msg);
      else {
        globalState.movies.push(movie);
        globalState.setMovie(movie);
      }
    });
  };

  const confirm = movie => {
    const modalContent = `Are you sure, you want to delete "${movie.Title}" ?`;
    const modalButtons = (
      <>
        <button
          className="btn btn-small btn-primary mr-1"
          onClick={() => globalState.removeMovie(movie.imdbID)}
        >
          OK
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={() => globalState.modalClose()}
        >
          Cancel
        </button>
      </>
    );

    globalState.setModal(true, modalContent, modalButtons);
  };

  const handleEdit = movieData => {
    const modalContent = modalForm(movieData, ref);

    const modalButtons = (
      <>
        <button
          className="btn btn-small btn-danger-dark mr-1"
          onClick={() => confirm(movieData)}
        >
          Delete
        </button>
        <button
          className="btn btn-small btn-danger mr-1"
          onClick={() => globalState.modalClose()}
        >
          Cancel
        </button>
        <button
          className="btn btn-small btn-primary"
          onClick={() => {
            movieData ? edit(movieData) : save();
          }}
        >
          Update
        </button>
      </>
    );

    globalState.setModal(true, modalContent, modalButtons);
  };

  return globalState.movies.map(itm => (
    <figure className="movie-card" key={itm.imdbID}>
      <div className="movie-info">
        <div className="movie-title">
          {itm.Title} <span> ({itm.Year})</span>
        </div>
        <div>
          {itm.Runtime} | {itm.Genre}
        </div>
        <div className="movie-director">Director: {itm.Director}</div>
      </div>
      <button className="btn btn-small" onClick={() => handleEdit(itm)}>
        Edit
      </button>
    </figure>
  ));
};

export default MovieCard;
