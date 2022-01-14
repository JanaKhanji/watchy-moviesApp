import React, { useEffect, useState } from "react";
import { forkJoin, Observable } from 'rxjs';
import imageSrc from "../../assets/img/movie.png";
import "./movieDetail.css";
import { useHistory } from "react-router-dom";
import { constructUrl } from "../API";
import Main from "../main";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spinner } from "react-bootstrap";

export default function MovieDetail({ match }) {
  useEffect(getData, [match]);
  const [data, setData] = useState({
    movieDetail : false,
    cast: [],
    trailer: null,
    similar: [],
  });

  function getData() {
    forkJoin(
      {
        movieDetail: Observable.create(observer => {
          fetch(constructUrl("movie/" + match.params.id, ""))
          .then((response) => response.json())
          .then((data) => {
              observer.next(data);
              observer.complete();
            })
            .catch(err => observer.error(err));
        }),
        trailer: Observable.create(observer => {
          fetch(constructUrl("movie/" + match.params.id + "/videos", ""))
          .then((response) => response.json())
          .then((data) => {
              observer.next(data.results);
              observer.complete();
            })
            .catch(err => observer.error(err));
        }),
        cast: Observable.create(observer => {
          fetch(constructUrl("movie/" + match.params.id + "/credits", ""))
          .then((response) => response.json())
          .then((data) => {
              observer.next(data.cast.slice(0, 6));
              observer.complete();
            })
            .catch(err => observer.error(err));
        }),
        similar: Observable.create(observer => {
          fetch(constructUrl("movie/" + match.params.id + "/similar", ""))
          .then((response) => response.json())
          .then((data) => {
              observer.next(data.results.slice(0, 6));
              observer.complete();
            })
            .catch(err => observer.error(err));
        }),
      }
    ).subscribe( res => {
      setData(res);
    });
  }
  
  let history = useHistory();
  function handelHistory() {
    history.goBack();
  }

  return (
    <div className="movieDetail white">
      {data.movieDetail ? (
        <div>
          <div className="detailHeader">
            <div className="mainTitle with-close py-2">
              <Button variant="outline-light" className="mr-2" onClick={handelHistory}>
                <FontAwesomeIcon  icon={['fas', 'arrow-left']} size="lg" />
              </Button>
              <h2 className="white mb-0"> {" " + data.movieDetail.title}</h2>
            </div>
          </div>
          <div className="detail">
            <img className="poster" src={
              data.movieDetail.poster_path ? "http://image.tmdb.org/t/p/w200/" + data.movieDetail.poster_path : imageSrc
            } alt="movie poster" />
            <div>
              <blockquote className="blockquote mb-0">
                <p>{data.movieDetail.overview}</p>
                <p>
                  <span className="pr-1">Rating :</span>
                  {data.movieDetail && Array.from(Array(parseInt(data.movieDetail.vote_average, 10)).keys()).map( el =>{
                     return (<FontAwesomeIcon  icon={['fas', 'star']} key={el} className="star" />)
                    })
                  }
                  {data.movieDetail && Array.from(Array(10 - parseInt(data.movieDetail.vote_average, 10)).keys()).map( el =>{
                     return (<FontAwesomeIcon  icon={['far', 'star']} key={el} className="star" />)
                    })
                  }
                </p>
                <p> Status : {data.movieDetail.status}</p>
                <p className="tags">
                  {data.movieDetail.genres
                    .map((el) => {
                      return el.name;
                    })
                    .join(", ")}
                </p>
                <footer className="blockquote-footer tags">
                  Release date: {data.movieDetail.release_date}
                </footer>
              </blockquote>
            </div>
          </div>
          {data.trailer[0] ? (
            <div>
              <h2 className="mainTitle white">Trailer</h2>
              <div style={{ margin: "auto", width: "50%" }}>
                <iframe
                  width="100%"
                  height="312s"
                  title="Movie trailer"
                  src={"https://www.youtube.com/embed/" + data.trailer[0].key}
                ></iframe>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <Spinner animation="border" role="status"></Spinner>
      )}
      {data.similar.length === 0 ? (
        ""
      ) : (
        <Main movies={data.similar} title="Similar Movies" />
      )}
    </div>
  );
}
