import React, { useContext, useEffect } from "react";
import "./styles.css";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Main from "./components/main";
import { constructUrl } from "./components/API";
import MovieDetail from "./components/movieDetails/movieDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StateContext } from "./StateProvider";
import './fontawesome';

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
    <Router className="App">
      <Header backHome={trendings} />
      <Switch>
        <Route path="/" exact>
          <Main movies={state.movies} title={state.title} />
        </Route>
        <Route path="/movieDetail/:id" component={MovieDetail} />
      </Switch>
      <Footer />
    </Router>
  );
}
