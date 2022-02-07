// image url : http://image.tmdb.org/t/p/w200/

import React from "react";
import { Card } from "react-bootstrap";
import imageSrc from "../../../../assets/img/movie.png";
import "./movieItem.scss";
import { Link } from "react-router-dom";

export default function MovieItem({ movie }) {
  let imgSrc = imageSrc;
  movie.poster_path != null &&
    (imgSrc = "http://image.tmdb.org/t/p/w200/" + movie.poster_path);

  return (
    <Link to={`/movieDetail/${movie.id}`}>
      <Card className="container_foto m-1">
        <article>
          <h2>{movie.title}</h2>
        </article>
        <Card.Img variant="top" src={imgSrc} alt="movie poster" />
        <div className="ver_mas text-center">
          <span className="lnr lnr-eye">see more</span>
        </div>
      </Card>
    </Link>
  );
}
