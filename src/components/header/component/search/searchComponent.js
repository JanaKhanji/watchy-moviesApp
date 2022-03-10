import React, { useRef, useEffect } from "react";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Form, Row, Col } from "react-bootstrap";
import "./searchComponent.scss";
import { useHistory } from "react-router-dom";

export default function SearchComponent() {
  const inputEl = useRef("");
  let history = useHistory();
  const input = new Subject();
  input.pipe(debounceTime(1000)).subscribe(handleSubmit);

  useEffect(() => {
    return history.listen((location) => { 
      inputEl.current.value = '';
    }) 
  },[history]) 

  function handleChange(event) {
    inputEl.current.value = event.target.value;
    input.next(null);
  }

  function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    if(inputEl.current) {
      history.push("/" + inputEl.current.value);
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
            ref={inputEl}
            type="text"
            placeholder="Search for Movies"
          />
        </Form>
      </Col>
    </Row>
  );
}
