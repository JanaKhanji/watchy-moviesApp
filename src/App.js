import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { constructUrl } from "./components/API";
import { StateContext } from "./StateProvider";

import "./styles.css";
import './fontawesome';

import Header from "./components/header/header";
import Footer from "./components/footer";
import Main from "./components/main";
import MovieItemComponent from "./components/movieItemComponent/movieItemComponent";

export default function App() {

  useEffect(trendings, []);
  const [state, dispatch] = useContext(StateContext);
  function trendings() {
    fetch(constructUrl("trending/movie/day", ""))
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_MOVIES",
          movies: data.results,
          title: "Trendings"
        });
      });
  }

  return (
    <Router>
      <div className="App d-flex flex-column justify-content-between">
        <Header backHome={trendings} />
        <div className="flex-fill">
          <Switch>
            <Route path="/" exact>
              <Main movies={state.movies} title={state.title} />
            </Route>
            <Route path="/movieDetail/:id" component={MovieItemComponent} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
