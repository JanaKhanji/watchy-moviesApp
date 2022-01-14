import React from "react";
import MovieItem from "./movieItem";

export default function MoviesGrid({ movies }) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {movies &&
        movies.map((mov) => {
          return <MovieItem key={mov.id} movie={mov} />;
        })}
    </div>
  );
}
