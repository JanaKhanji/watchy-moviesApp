import React, { useContext } from "react";
import MoviesGrid from "./moviesGrid/moviesGrid";
import MovieSpace from './moviesGrid/components/movieSpace/movieSpace';

import { StateContext } from "../StateProvider";

export default function Main() {
  const [state, dispatch] = useContext(StateContext);
  return (
    <div className="container">
      {state.loading ? (
        <div className="d-flex w-100 h-100 justify-content-center align-items-center">
         <div className="spinner-border text-light" role="status"></div>
        </div>
      ) : (
        <>
          <h2 className="text-light h2 border-bottom m-3">{state.title}</h2>
          <MovieSpace movie={state.movies[0]}></MovieSpace>
          <MoviesGrid movies={state.movies.slice(1)} />
        </>
      )}
    </div>
  );
}
