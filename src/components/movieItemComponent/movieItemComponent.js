import React, { useEffect, useState } from "react";
import { forkJoin, Observable } from 'rxjs';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spinner } from "react-bootstrap";

import { constructUrl } from "../API";
import "./movieItemComponent.css";
import Main from "../main";

import Trailer from './components/trailer';
import MovieDetail from "./components/details";
import Casts from "./components/cast";

export default function MovieItemComponent({ match }) {
  useEffect(getData, [match]);
  const [data, setData] = useState({
    loading : true,
    movieDetail : null,
    cast: [],
    trailer: null,
    similar: [],
  });

  function getData() {
    let tempData = {...data};
    tempData.loading = true;
    setData (tempData);
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
      setData({ loading: false, ...res});
    });
  }
  
  let history = useHistory();
  function handelHistory() {
    history.goBack();
  }

  return (
    <div className="movieDetail white container">
      {data.loading ? (
        <div className="d-flex w-100 h-100 justify-content-center align-items-center">
         <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div>
        <div className="detailHeader">
          <div className="mainTitle with-close py-2">
            <Button variant="outline-light" className="mr-2" onClick={handelHistory}>
              <FontAwesomeIcon  icon={['fas', 'arrow-left']} size="lg" />
            </Button>
            <h2 className="white mb-0 text-truncate"> {" " + data.movieDetail.title}</h2>
          </div>
        </div>
        { data.movieDetail && <MovieDetail movieDetail={data.movieDetail}></MovieDetail>}
        { data.trailer[0] && <Trailer trailer={data.trailer[0]}></Trailer> }
        { data.cast && <Casts casts={data.cast}></Casts>}
        { data.similar.length && <Main movies={data.similar} title="Similar Movies" /> }
      </div>
      )}
    </div>
  );
}
