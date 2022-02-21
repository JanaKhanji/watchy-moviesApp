import React, { useState, useContext } from "react";
import Search from "./component/search/searchComponent";
import "./header.scss";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { constructUrl, genresUrl } from "../API";
import imageSrc from "../../assets/img/movie.png";
import { useHistory } from "react-router-dom";
import { StateContext } from "../../StateProvider";

export default function Header({ backHome }) {
  const genresHTML = [];
  const [state, dispatch] = useContext(StateContext);
  getData();

  function getData() {
    fetch(constructUrl("genre/movie/list", ""))
    .then((response) => response.json())
    .then((data) => {
      data.genres.forEach((element) => {
        genresHTML.push(
          <NavDropdown.Item
            className="dropdownLink dropdown-item text-dark"
            onClick={() => {
              handelGenres(element);
              handelHistory();
            }}
            key={element.id}
          >
            {element.name}
          </NavDropdown.Item>
        );
      });
    });
  } 

  let history = useHistory();
  function handelHistory() {
    history.push("/");
  }

  function handelBack() {
    history.push("/");
    backHome()
  }

  function handelGenres(query) {
    dispatch({
      type: "SET_LOADING",
    });
    fetch(genresUrl("discover/movie", query.id))
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_MOVIES",
          movies: data.results,
          title: query.name,
        });
      });
  }

  return (
    <Navbar className="bg-dark text-light py-1" variant="dark" expand="sm">
      <Navbar.Brand className="brandName" onClick={handelBack}>
        <Nav.Link to="/" className="h1 m-0 p-0 text-light">
          wat<span className="text-my-red">ch</span>y
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100">
          <Nav.Link to="/" onClick={handelBack} className="text-light">
            Movies
          </Nav.Link>
          <NavDropdown title="Genres" id="basic-nav-dropdown" className="nav-link text-light">
            {genresHTML}
          </NavDropdown>
          <Search handelBack={handelBack} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
