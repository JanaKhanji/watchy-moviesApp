import React, { useEffect, useState } from "react";
import imageSrc from "../assets/img/movie.png";
import star from "../assets/img/star.png";
import starEmpty from "../assets/img/starEmpty.png";
import back from "../assets/img/back.png";
import "./movieDetail.css";
import { useHistory } from "react-router-dom";
import { constructUrl } from "./API";
import Main from "./main";
import { Spin } from "antd";

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
    rating.push(<img key={i} className="star" src={star} alt="movie poster" />);
  }
  for (let i = 0; i < 10 - rating.length; i++) {
    noRating.push(
      <img key={i} className="star" src={starEmpty} alt="movie poster" />
    );
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
            <div className="mainTitle with-close">
              <h2 className="white"> {" " + movieDetail.title}</h2>
              <span onClick={handelHistory} className="backImg">
                <img width="25px" src={back} alt="back" />
              </span>
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
