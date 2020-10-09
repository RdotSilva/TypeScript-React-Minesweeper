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

  const [state, dispatch] = useReducer(gameSettingsReducer, initialState);

  const changeDifficulty = (difficultySettings) => {
    dispatch({
      type: CHANGE_DIFFICULTY,
      payload: difficultySettings,
    });
  };

  // TODO: Return GameSettingsContext.Provider
};
