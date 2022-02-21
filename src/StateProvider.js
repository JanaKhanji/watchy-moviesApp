import React, { createContext, useReducer } from "react";

export const StateContext = createContext();
const initialState = { movies: [], title: "", loading: true };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.movies, title: action.title, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const StateProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {props.children}
    </StateContext.Provider>
  );
};
