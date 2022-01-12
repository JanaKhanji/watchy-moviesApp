import React, { useEffect, useState } from "react";
import imageSrc from "../assets/img/movie.png";
import "./movieDetail.css";
import { useHistory } from "react-router-dom";
import { constructUrl } from "./API";
import Main from "./main";
import { Spin } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "react-bootstrap";

export default function MovieDetail({ match }) {
  useEffect(getData, [match]);
  const [movieDetail, setMovieDetail] = useState(false);
  const [trailer, setTrailer] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  let imgSrc = imageSrc;
  let rating = [];
  let noRating = [];
  function getData() {
    fetch(constructUrl("movie/" + match.params.id, ""))
      .then((response) => response.json())
      .then((data) => {
        setMovieDetail(data);
      });
    fetch(constructUrl("movie/" + match.params.id + "/similar", ""))
      .then((response) => response.json())
      .then((data) => {
        setSimilarMovies(data.results.slice(0, 6));
      });
    fetch(constructUrl("movie/" + match.params.id + "/videos", ""))
      .then((response) => response.json())
      .then((data) => {
        setTrailer(data.results);
      });
  }
  movieDetail &&
    movieDetail.poster_path != null &&
    (imgSrc = "http://image.tmdb.org/t/p/w200/" + movieDetail.poster_path);
  for (let i = 0; i < parseInt(movieDetail.vote_average, 10); i++) {
    rating.push(<FontAwesomeIcon  icon={['fas', 'star']} key={i} className="star" />);
  }
  for (let i = 0; i < 10 - rating.length; i++) {
    noRating.push(<FontAwesomeIcon  icon={['far', 'star']} key={i} className="star" />);
  }
  
  let history = useHistory();
  function handelHistory() {
    history.goBack();
  }
  return (
    //  style={{ backgroundImage: `url(${imgSrc})` }}
    <div className="movieDetail white">
      {movieDetail ? (
        <div>
          <div className="detailHeader">
            <div className="mainTitle with-close py-2">
              <Button variant="outline-light" className="mr-2" onClick={handelHistory}>
                <FontAwesomeIcon  icon={['fas', 'arrow-left']} size="lg" />
              </Button>
              <h2 className="white mb-0"> {" " + movieDetail.title}</h2>
            </div>
          </div>
          <div className="detail">
            <img className="poster" src={imgSrc} alt="movie poster" />
            <div>
              <blockquote className="blockquote mb-0">
                <p>{movieDetail.overview}</p>
                <p>
                  Rating: {rating}
                  {noRating}
                </p>
                <p> Status : {movieDetail.status}</p>
                <p className="tags">
                  {movieDetail.genres
                    .map((el) => {
                      return el.name;
                    })
                    .join(", ")}
                </p>
                <footer className="blockquote-footer tags">
                  Release date: {movieDetail.release_date}
                </footer>
              </blockquote>
            </div>
          </div>
          {trailer[0] ? (
            <div>
              <h2 className="mainTitle white">Trailer</h2>
              <div style={{ margin: "auto", width: "50%" }}>
                <iframe
                  width="100%"
                  height="312s"
                  title="Movie trailer"
                  src={"https://www.youtube.com/embed/" + trailer[0].key}
                ></iframe>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <Spin
          size="large"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%"
          }}
        />
      )}
      {similarMovies.length === 0 ? (
        ""
      ) : (
        <Main movies={similarMovies} title="Similar Movies" />
      )}
    </div>
  );
}
