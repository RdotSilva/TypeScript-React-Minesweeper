import { CHANGE_DIFFICULTY } from "../types";

export default (state, action) => {
  switch (action.type) {
    case CHANGE_DIFFICULTY:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        mines: action.payload.mines,
      };
    default:
      return state;
  }
};
