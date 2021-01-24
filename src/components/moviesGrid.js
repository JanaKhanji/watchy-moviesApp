import React from "react";
import MovieItem from "./movieItem";

export default function MoviesGrid({ movies }) {
  return (
    <div className="rowClass">
      {movies &&
        movies.map((mov) => {
          return <MovieItem key={mov.id} movie={mov} />;
        })}
    </div>
  );
}
