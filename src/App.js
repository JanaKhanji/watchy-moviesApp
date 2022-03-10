import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles.scss";
import "./scss/custom.scss";
import './fontawesome';

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import MovieItemPage from "./pages/movieItemPage/movieItemPage";
import Main from "./pages/mainPage/main";

export default function App() {
  return (
    <Router>
      <div className="App d-flex flex-column justify-content-between">
        <Header />
        <div className="flex-fill">
          <Switch>
            <Route path="/movie/:id" exact component={MovieItemPage} />
            <Route path={["/:genre/:title","/:search","/"]} exact>
              <Main />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
