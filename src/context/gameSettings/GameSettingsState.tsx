import React, { useReducer } from "react";
import { CHANGE_DIFFICULTY } from "../types";
import gameSettingsContext from "./gameSettingsContext";
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

  return (
    <gameSettingsContext.Provider
      value={{
        width: state.width,
        height: state.height,
        mines: state.mines,
        changeDifficulty,
      }}
    >
      {props.children}
    </gameSettingsContext.Provider>
  );
};
