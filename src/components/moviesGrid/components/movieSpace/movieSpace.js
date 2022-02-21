import React from "react";
import "./movieSpace.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        justifyContent: 'end',
    }

  console.log(movie);
  return (
    <div className="w-100 mb-3" style={backgroundStyle}>
      <div className="custom-movieSpace-padding">
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
        <Link to={`/movieDetail/${movie.id}`} className="lnr lnr-eye text-my-red">see more</Link>
      </div>
    </div>
    
  );
}