import React from "react";
import "./movieSpace.scss";
import { Link } from "react-router-dom";

export default function MovieSpace({ movie }) {
    const backgroundStyle = {
        backgroundImage: `linear-gradient(to left, #212121 , rgba(1, 1, 1, 0)),
            url(${movie.poster_path != null && ("http://image.tmdb.org/t/p/w500/" + movie.backdrop_path)})`,
        backgroundRepeat: 'no-repeat',
        backgroundOrigin: 'content-box',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'right top',
        height: '299px',
    }

  console.log(movie);
  return (
    <div className="w-100 mb-3 mx-3" style={backgroundStyle}>
        <h2>{movie.title}</h2>
        <p className="w-50">{movie.overview}</p>
        <Link to={`/movieDetail/${movie.id}`} className="lnr lnr-eye">see more</Link>
    </div>
    
  );
}