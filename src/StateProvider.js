import React, { createContext, useReducer } from "react";

export const StateContext = createContext();
const initialState = { user: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { user: action.user };
    case "REMOVE_USER":
      return { user:  {} };
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
