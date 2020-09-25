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
  return (
    <div className={`Button ${state === CellState.Visible ? "visible" : ""}`}>
      {renderContent()}
    </div>
  );
};

export default Button;
