import React, { useState, useRef, useContext } from "react";
import { Form } from "react-bootstrap";
import { constructUrl } from "./API";
import { Spin, Input, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./searchComponent.css";
import { useHistory } from "react-router-dom";
import { StateContext } from "../StateProvider";

export default function SearchComponent() {
  const [state, dispatch] = useContext(StateContext);

  const inputEl = useRef("");
  const [spinnerShow, setSpinner] = useState(false);
  let history = useHistory();
  function handleChange(event) {
    if (event.target.value === "") {
      setSpinner(false);
    } else {
      setSpinner(true);
      inputEl.current = event.target.value;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const query = inputEl.current;
    console.log(query, inputEl);
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
    event.target.value = "";
    setSpinner(false);
  }

  return (
    <Row>
      <Col>{spinnerShow && <Spin style={{ margin: "5px" }} />}</Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Input
            className="search-input"
            name="search"
            onChange={handleChange}
            type="text"
            placeholder="Search for Movies"
            prefix={<SearchOutlined />}
          />
        </Form>
      </Col>
    </Row>
  );
}
