import React, { useState, useEffect, useRef } from "react";
import Context from "./_context";
import MovieCard from "./components/movie-card";
import Overlay from "./components/overlay";
import Modal from "./components/modal";
import { filterText, validator, msgText } from "./util/functions";
import "./styles/App.css";

import { modalForm } from "./util/modal";

function App() {
  const msg = useRef();
  const title = useRef();
  const year = useRef();
  const runtime = useRef();
  const genre = useRef();
  const director = useRef();
  const ref = { msg, title, year, runtime, genre, director };

  const [state, setState] = useState({
    movies: [],
    modal: false
  });

  useEffect(() => {
    const ApiKey = "124af7f8";
    fetch(`http://www.omdbapi.com/?s=new&apikey=${ApiKey}`)
      .then(res => res.json())
      .then(data => {
        const titles = data.Search.map(itm => itm.Title);
        return titles;
      })
      .then(titles => {
        return Promise.all(
          titles.map(title => {
            return fetch(
              `http://www.omdbapi.com/?t=${title}&plot=full&apikey=${ApiKey}`
            )
              .then(res => res.json())
              .then(data => data);
          })
        );
      })
      .then(data => {
        setState({
          ...state,
          movies: data.map(itm => {
            itm.Title = filterText(itm.Title);
            return itm;
          }),
          isLoaded: true
        });
      });
  }, []);

  const removeMovie = id => {
    setState({
      ...state,
      movies: state.movies.filter(itm => itm.imdbID !== id)
    });
  };

  const setMovie = movie => {
    setState({
      ...state,
      movie,
      modal: { active: false }
    });
  };

  const setModal = (active, content, buttons) => {
    setState({
      ...state,
      modal: {
        active: active,
        content: content,
        buttons: buttons
      }
    });
  };

  const modalClose = () => {
    setState({ ...state, modal: { active: false } });
  };

  const store = {
    movies: state.movies,
    modalClose: () => modalClose(),
    removeMovie: id => removeMovie(id),
    setMovie: movie => setMovie(movie),
    setModal: (active, content, buttons) => setModal(active, content, buttons)
  };

  const newMovie = () => {
    const modalContent = modalForm(null, ref);

    const save = () => {
      validator(state.movies, ref).then(movie => {
        if (movie.error) msgText(movie.error, msg);
        else {
          state.movies.push(movie);
          setMovie(movie);
        }
      });
    };

    const modalButtons = (
      <>
        <button
          className="btn btn-small btn-danger mr-1"
          onClick={() => modalClose()}
        >
          Cancel
        </button>
        <button className="btn btn-small btn-primary" onClick={() => save()}>
          Save
        </button>
      </>
    );

    setModal(true, modalContent, modalButtons);
  };

  return (
    <Context.Provider value={store}>
      <Overlay show={state.modal.active} />
      <Modal show={state.modal.active} buttons={state.modal.buttons}>
        {state.modal.content}
      </Modal>
      <div className="container">
        <MovieCard />
      </div>
      <button className="btn btn-flow" onClick={() => newMovie()}>
        +
      </button>
    </Context.Provider>
  );
}

export default App;
