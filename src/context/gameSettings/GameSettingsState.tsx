import React, { useReducer } from "react";
import { CHANGE_DIFFICULTY } from "../types";
import gameSettingsReducer from "./gameSettingsReducer";

const GameSettingsState = (props) => {
  const initialState = {
    width: 9,
    height: 9,
    mines: 10,
  };

  // TODO: Add dispatch for CHANGE_DIFFICULTY

  // TODO: Return GameSettingsContext.Provider
};
