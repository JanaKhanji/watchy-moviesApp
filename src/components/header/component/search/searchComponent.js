import React, { useRef, useContext } from "react";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Form, Row, Col } from "react-bootstrap";
import { constructUrl } from "../../../API";
import "./searchComponent.scss";
import { useHistory } from "react-router-dom";
import { StateContext } from "../../../../StateProvider";

export default function SearchComponent({handelBack}) {
  const [state, dispatch] = useContext(StateContext);

  const inputEl = useRef("");
  let history = useHistory();
  const input = new Subject();
  input.pipe(debounceTime(1000)).subscribe(handleSubmit);

  function handleChange(event) {
    inputEl.current = event.target.value;
    input.next(null);
  }

  function handleSubmit(event) {
    const query = inputEl.current;
    if (event) {
      event.preventDefault();
    }
    if(inputEl.current) {
      dispatch({
        type: "SET_LOADING",
      });
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
    <Row className="ml-sm-0 ml-md-auto" >
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="search-input"
            name="search"
            onChange={handleChange}
            type="text"
            placeholder="Search for Movies"
          />
        </Form>
      </Col>
    </Row>
  );
}
