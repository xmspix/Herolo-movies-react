import React from "react";

export const modalForm = (movieData, ref) => (
  <>
    <div className="msg" ref={ref.msg}></div>
    <label htmlFor="title">Title :</label>
    <input
      type="text"
      defaultValue={movieData ? movieData.Title : ""}
      ref={ref.title}
      id="title"
    />

    <label htmlFor="year">Year :</label>
    <input
      type="text"
      defaultValue={movieData ? movieData.Year : ""}
      ref={ref.year}
      id="year"
    />

    <label htmlFor="runtime">Runtime :</label>
    <input
      type="text"
      defaultValue={movieData ? movieData.Runtime : ""}
      ref={ref.runtime}
      id="runtime"
    />

    <label htmlFor="genre">Genre :</label>
    <input
      type="text"
      defaultValue={movieData ? movieData.Genre : ""}
      ref={ref.genre}
      id="genre"
    />

    <label htmlFor="director">Director :</label>
    <input
      type="text"
      defaultValue={movieData ? movieData.Director : ""}
      ref={ref.director}
      id="director"
    />
  </>
);
