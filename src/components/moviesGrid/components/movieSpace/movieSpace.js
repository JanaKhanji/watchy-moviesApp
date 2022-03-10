import React from "react";
import "./movieSpace.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imageSrc from "../../../../assets/img/movie.png";

export default function MovieSpace({ movie }) {
    const backgroundStyle = {
      backgroundImage: `
        linear-gradient(to left, rgb(46, 40, 40, 0.5), rgb(46, 40, 40, 0)),
        linear-gradient(to right, rgb(46, 40, 40, 0.5), rgb(46, 40, 40, 0)),
        linear-gradient(to top, rgb(46, 40, 40, 1), rgb(46, 40, 40, 0)), 
        url(${movie.poster_path != null && ("http://image.tmdb.org/t/p/w500/" + movie.backdrop_path)})`,
        backgroundRepeat: 'no-repeat',
        backgroundOrigin: 'content-box',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }

    return (
    <div className="w-100 mb-3" style={backgroundStyle}>
      <div className="custom-movieSpace-padding d-flex justify-content-between">
        <div className="d-flex flex-column justify-content-end">
          <h1 className="text-my-red">{movie.title}</h1>
          <p className="custom-movieSpace-overview mb-0">{movie.overview}</p>
          <p className="mb-0">
            {Array.from(Array(parseInt(movie.vote_average, 10)).keys()).map( el =>{
                return (<FontAwesomeIcon  icon={['fas', 'star']} key={el} className="star" />)
              })
            }
            {Array.from(Array(10 - parseInt(movie.vote_average, 10)).keys()).map( el =>{
                return (<FontAwesomeIcon  icon={['far', 'star']} key={el} className="star" />)
              })
            }
          </p>
          <Link to={`/movie/${movie.id}`} className="btn btn-my-red text-white mt-2">see more</Link>
        </div>
        <img
          className="d-none d-md-block custom-movieSpace-image rounded"
          src={movie.poster_path? "http://image.tmdb.org/t/p/w200/" + movie.poster_path : imageSrc}
          alt="movie poster" />
      </div>
    </div>
    
  );
}