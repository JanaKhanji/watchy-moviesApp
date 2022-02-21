import React, { useEffect, useState } from "react";
import { forkJoin, Observable } from 'rxjs';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { constructUrl } from "../API";
import "./movieItemComponent.scss";

import MoviesGrid from "../moviesGrid/moviesGrid";
import Trailer from './components/trailer';
import MovieDetail from "./components/details";
import Casts from "./components/cast";

export default function MovieItemComponent({ match }) {
  useEffect(getData, [match]);
  const [data, setData] = useState({
    loading : true,
    error: false,
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
              observer.next(data.cast.slice(0, 12));
              observer.complete();
            })
            .catch(err => observer.error(err));
        }),
        similar: Observable.create(observer => {
          fetch(constructUrl("movie/" + match.params.id + "/similar", ""))
          .then((response) => response.json())
          .then((data) => {
              observer.next(data.results.slice(0, 12));
              observer.complete();
            })
            .catch(err => observer.error(err));
        }),
      }
    ).subscribe( res => {
      setData({ loading: false, error: false, ...res});
    }, () => {
      setData({ loading: false, error: true });
    });
  }
  
  let history = useHistory();
  function handelHistory() {
    history.goBack();
  }

  return (
    <div className="container">
      {data.loading ? (
        <div className="d-flex w-100 h-100 justify-content-center align-items-center">
         <div className="spinner-border text-light mt-5" role="status"></div>
        </div>
      ) : (
        data.error ? (
            <div>error</div>
        ) : (
          <div>
            <div>
              <div className="text-light h2 border-bottom m-3 d-flex align-items-center">
                <button className="btn btn-flat-light mr-2 py-0 px-1" onClick={handelHistory}>
                  <FontAwesomeIcon  icon={['fas', 'arrow-left']} size="lg" />
                </button>
                <h2 className="mb-0 text-truncate"> {data.movieDetail.title}</h2>
              </div>
            </div>
            { data.movieDetail && <MovieDetail movieDetail={data.movieDetail}></MovieDetail>}
            { data.trailer[0] && <Trailer trailer={data.trailer[0]}></Trailer> }
            { data.cast.length !== 0 && <Casts casts={data.cast}></Casts>}
            { data.similar.length !== 0 &&
              <>
               <h2 className="text-light h2 border-bottom m-3">Similar Movies</h2>
               <MoviesGrid movies={data.similar} />
              </>
            }
          </div>
        )
      )}
    </div>
  );
}
