import React, { useContext } from "react";
import Search from "./searchComponent";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { constructUrl, genresUrl } from "./API";
import imageSrc from "../assets/img/movie.png";
import { Link, useHistory } from "react-router-dom";
import { StateContext } from "../StateProvider";

export default function Header({ bakcHome }) {
  let genresHTML = [];
  const [state, dispatch] = useContext(StateContext);

  fetch(constructUrl("genre/movie/list", ""))
    .then((response) => response.json())
    .then((data) => {
      data.genres.forEach((element) => {
        genresHTML.push(
          <NavDropdown.Item
            className="dropdownLink"
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

  let history = useHistory();
  function handelHistory() {
    history.push("/");
  }

  function handelGenres(query) {
    fetch(genresUrl("discover/movie", query.id))
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_MOVIES",
          movies: data.results,
          title: query.name
        });
      });
  }
  return (
    <Navbar variant="dark" expand="lg">
      <Navbar.Brand className="brandName" onClick={bakcHome}>
        <Link to="/" className="white noDecoration">
          <img
            src={imageSrc}
            width="30"
            className="d-inline-block align-top "
            alt="Movie App logo"
          />{" "}
          <span>w</span>at
          <span style={{ color: "#ff0252" }}>ch</span>y
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" onClick={bakcHome} className="white noDecoration">
            Home
          </Link>
          <NavDropdown title="Genres" id="basic-nav-dropdown">
            {genresHTML}
          </NavDropdown>
        </Nav>
        <Nav>
          <Search />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
