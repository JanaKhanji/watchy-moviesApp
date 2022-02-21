import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import imageSrc from "../../../assets/img/movie.png";

export default function MovieDetail({ movieDetail }) {
  return (
    <div className="detail">
            <img className="poster" src={
              movieDetail.poster_path ? "http://image.tmdb.org/t/p/w200/" + movieDetail.poster_path : imageSrc
            } alt="movie poster" />
            <div>
              <p>{movieDetail.overview}</p>
              <p>
                <span className="pr-1">Rating :</span>
                {Array.from(Array(parseInt(movieDetail.vote_average, 10)).keys()).map( el =>{
                    return (<FontAwesomeIcon  icon={['fas', 'star']} key={el} className="star" />)
                  })
                }
                {Array.from(Array(10 - parseInt(movieDetail.vote_average, 10)).keys()).map( el =>{
                    return (<FontAwesomeIcon  icon={['far', 'star']} key={el} className="star" />)
                  })
                }
              </p>
              <p> Status : {movieDetail.status}</p>
              <p className="tags text-my-red">
                {movieDetail.genres
                  .map((el) => {
                    return el.name;
                  })
                  .join(", ")}
              </p>
              <footer className="blockquote-footer tags text-my-red">
                Release date: {movieDetail.release_date}
              </footer>
            </div>
          </div>
  );
}
