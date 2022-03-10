import React, { useEffect, useState } from "react";
import MoviesGrid from "../../components/moviesGrid/moviesGrid";
import MovieSpace from '../../components/moviesGrid/components/movieSpace/movieSpace';
import { constructUrl, genresUrl } from "../../API";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Main() {
  const [data, setData] = useState({
    loading: true,
    movies: [],
    title: ''
  });

  const params = useParams();
  useEffect(() => {
    setData({
      loading: true,
    });
    if (params.genre) {
      handelGenres(params.genre, params.title)
    } else if (params.search) {
      handelSearch(params.search);
    } else {
      trending();
    }
  }, [params]);


  function trending() {
    fetch(constructUrl("trending/movie/day", ""))
      .then((response) => response.json())
      .then((data) => {
        setData({
          loading: false,
          movies: data.results,
          title: "Trending",
        });
      });
  }

  function handelGenres(query, name) {
    fetch(genresUrl("discover/movie", query))
      .then((response) => response.json())
      .then((data) => {
        setData({
          loading: false,
          movies: data.results,
          title: name,
        });
      });
  }

  function handelSearch(query) {
    fetch(constructUrl("search/movie", query))
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length) {
          setData({
            loading: false,
            movies: data.results,
            title: query,
          });
        } else {
          setData({
            loading: false,
            movies: [],
            title: query,
          });
        }
      });
  }

  return (
    <>
      {data.loading ? (
        <div className="d-flex w-100 h-100 justify-content-center align-items-center">
          <div className="spinner-border text-light mt-5" role="status"></div>
        </div>
      ) : (
        data.movies.length ? (
          <>
            <MovieSpace movie={data.movies[0]}></MovieSpace>
            {!!data.movies.slice(1).length && (
              <div className="container">
                <h2 className="text-light h2 border-bottom m-3">Check more for {data.title}</h2>
                <MoviesGrid movies={data.movies.slice(1)} />
              </div>
            )}
          </>
        ) : (
          <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center mt-5">
            <FontAwesomeIcon  icon={['fas', 'film']} className="mb-2" style={{fontSize: '50px'}} />
            <p>No results found for your search</p>
          </div>
          )
      )}
    </>
  );
}
