import React, { useRef, useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { constructUrl } from "../../../API";
import "./searchComponent.css";
import { useHistory } from "react-router-dom";
import { StateContext } from "../../../../StateProvider";

export default function SearchComponent({handelBack}) {
  const [state, dispatch] = useContext(StateContext);

  const inputEl = useRef("");
  let history = useHistory();
  let timer = null;

  function handleChange(event) {
    timer = setTimeout(handleSubmit, 1000);
    inputEl.current = event.target.value;
  }

  function clearTimer() {
    if (timer) {
      clearTimeout(timer);
    }
  }

  function handleSubmit(event) {
    const query = inputEl.current;
    if (event) {
      event.preventDefault();
    }
    if(inputEl.current) {
      fetch(constructUrl("search/movie", query))
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_MOVIES",
          movies: data.results,
          title: query
        });
        history.push("/");
      });
    } else {
      history.push("/");
      handelBack();
    }
  }

  return (
    <Row>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="search-input"
            name="search"
            onKeyUp={handleChange}
            onKeyDown={clearTimer}
            type="text"
            placeholder="Search for Movies"
          />
        </Form>
      </Col>
    </Row>
  );
}
