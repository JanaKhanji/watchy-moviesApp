import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { constructUrl } from "./components/API";
import { StateContext } from "./StateProvider";

import "./styles.scss";
import "./scss/custom.scss";
import './fontawesome';

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import MovieItemComponent from "./components/movieItemComponent/movieItemComponent";
import Main from "./components/main";

export default function App() {

  useEffect(trending, []);
  const [state, dispatch] = useContext(StateContext);

  function trending() {
    dispatch({
      type: "SET_LOADING",
    });
    fetch(constructUrl("trending/movie/day", ""))
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_MOVIES",
          movies: data.results,
          title: "Trending",
        });
      });
  }

  return (
    <Router>
      <div className="App d-flex flex-column justify-content-between">
        <Header backHome={trending} />
        <div className="flex-fill">
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/movieDetail/:id" component={MovieItemComponent} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
