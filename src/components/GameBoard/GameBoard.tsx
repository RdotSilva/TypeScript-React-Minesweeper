import React, { useState, useContext } from "react";
import gameSettingsContext from "../../context/gameSettings/gameSettingsContext";
import { Cell, CellState, CellValue, Face } from "../../types";
import { CellObject } from "./../../interfaces/CellObject";

import "./GameBoard.scss";

const GameBoard: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>([[]]);
  const [face, setFace] = useState<Face>(Face.Smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const context = useContext(gameSettingsContext);
  const { height, width, mines } = context;

  const grabAllAdjacentCells = (
    cells: Cell[][],
    rowParam: number,
    colParam: number
  ): CellObject => {
    const topLeftCell =
      rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
    const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
    const topRightCell =
      rowParam > 0 && colParam < width - 1
        ? cells[rowParam - 1][colParam + 1]
        : null;
    const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
    const rightCell =
      colParam < width - 1 ? cells[rowParam][colParam + 1] : null;
    const bottomLeftCell =
      rowParam < height - 1 && colParam > 0
        ? cells[rowParam + 1][colParam - 1]
        : null;
    const bottomCell =
      rowParam < height - 1 ? cells[rowParam + 1][colParam] : null;
    const bottomRightCell =
      rowParam < height - 1 && colParam < width - 1
        ? cells[rowParam + 1][colParam + 1]
        : null;

    return {
      topLeftCell,
      topCell,
      topRightCell,
      leftCell,
      rightCell,
      bottomLeftCell,
      bottomCell,
      bottomRightCell,
    };
  };

  return <div className="GameSettings"></div>;
};

export default GameBoard;
