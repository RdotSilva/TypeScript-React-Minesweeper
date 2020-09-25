import React from "react";
import { CellState, CellValue } from "../../types";
import "./Button.scss";

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
}

const Button: React.FC<ButtonProps> = ({ row, col, state, value }) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.Visible) {
      if (value === CellValue.Bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      }
    } else if (state === CellState.Flagged) {
      // TODO: Display flag emoji here
    }
    return null;
  };
  return (
    <div className={`Button ${state === CellState.Visible ? "visible" : ""}`}>
      {renderContent()}
    </div>
  );
};

export default Button;
