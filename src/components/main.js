import React from "react";
import MoviesGrid from "./moviesGrid";

export default function Main({ movies, title }) {
  return (
    <div>
      <h2 className="mainTitle white">{title}</h2>
      <MoviesGrid movies={movies} />
    </div>
  );
}
