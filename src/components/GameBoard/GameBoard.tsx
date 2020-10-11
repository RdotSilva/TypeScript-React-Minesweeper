import React, { useState, useContext, useEffect } from "react";
import gameSettingsContext from "../../context/gameSettings/gameSettingsContext";
import { Cell, CellState, CellValue, Face } from "../../types";
import GameSettings from "../GameSettings";
import NumberDisplay from "../NumberDisplay";
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

  useEffect(() => {
    setCells(generateCells());
  }, []);

  // Reset game and clear board
  const handleFaceClick = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells);
    setHasLost(false);
    setHasWon(false);
  };

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

  const generateCells = (): Cell[][] => {
    let cells: Cell[][] = [];
    let bombsPlaced = 0;

    for (let row = 0; row < width; row++) {
      cells.push([]);
      for (let col = 0; col < height; col++) {
        cells[row].push({
          value: CellValue.None,
          state: CellState.Open,
        });
      }
    }

    // Generate cells containing bombs
    while (bombsPlaced < mines) {
      const randomRow = Math.floor(Math.random() * width);
      const randomCol = Math.floor(Math.random() * height);
      const currentCell = cells[randomRow][randomCol];

      if (currentCell.value !== CellValue.Bomb) {
        cells = cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (randomRow === rowIndex && randomCol === colIndex) {
              return {
                ...cell,
                value: CellValue.Bomb,
              };
            }

            return cell;
          })
        );
        bombsPlaced++;
      }
    }

    // Calculate the number of bombs for each cell
    for (let rowIndex = 0; rowIndex < width; rowIndex++) {
      for (let colIndex = 0; colIndex < height; colIndex++) {
        const currentCell = cells[rowIndex][colIndex];
        if (currentCell.value === CellValue.Bomb) {
          continue;
        }

        let numberOfBombs = 0;

        const {
          topLeftCell,
          topCell,
          topRightCell,
          leftCell,
          rightCell,
          bottomLeftCell,
          bottomCell,
          bottomRightCell,
        } = grabAllAdjacentCells(cells, rowIndex, colIndex);

        if (topLeftCell?.value === CellValue.Bomb) {
          numberOfBombs++;
        }
        if (topCell?.value === CellValue.Bomb) {
          numberOfBombs++;
        }
        if (topRightCell?.value === CellValue.Bomb) {
          numberOfBombs++;
        }
        if (leftCell?.value === CellValue.Bomb) {
          numberOfBombs++;
        }
        if (rightCell?.value === CellValue.Bomb) {
          numberOfBombs++;
        }
        if (bottomLeftCell?.value === CellValue.Bomb) {
          numberOfBombs++;
        }
        if (bottomCell?.value === CellValue.Bomb) {
          numberOfBombs++;
        }
        if (bottomRightCell?.value === CellValue.Bomb) {
          numberOfBombs++;
        }

        if (numberOfBombs > 0) {
          cells[rowIndex][colIndex] = {
            ...currentCell,
            value: numberOfBombs,
          };
        }
      }
    }

    return cells;
  };

  const openMultipleCells = (
    cells: Cell[][],
    rowParam: number,
    colParam: number
  ): Cell[][] => {
    const currentCell = cells[rowParam][colParam];

    if (
      currentCell.state === CellState.Visible ||
      currentCell.state === CellState.Flagged
    ) {
      return cells;
    }
    let newCells = cells.slice();
    newCells[rowParam][colParam].state = CellState.Visible;

    const {
      topLeftCell,
      topCell,
      topRightCell,
      leftCell,
      rightCell,
      bottomLeftCell,
      bottomCell,
      bottomRightCell,
    } = grabAllAdjacentCells(cells, rowParam, colParam);

    if (
      topLeftCell?.state === CellState.Open &&
      topLeftCell.value !== CellValue.Bomb
    ) {
      if (topLeftCell.value === CellValue.None) {
        newCells = openMultipleCells(newCells, rowParam - 1, colParam - 1);
      } else {
        newCells[rowParam - 1][colParam - 1].state = CellState.Visible;
      }
    }

    if (topCell?.state === CellState.Open && topCell.value !== CellValue.Bomb) {
      if (topCell.value === CellValue.None) {
        newCells = openMultipleCells(newCells, rowParam - 1, colParam);
      } else {
        newCells[rowParam - 1][colParam].state = CellState.Visible;
      }
    }

    if (
      topRightCell?.state === CellState.Open &&
      topRightCell.value !== CellValue.Bomb
    ) {
      if (topRightCell.value === CellValue.None) {
        newCells = openMultipleCells(newCells, rowParam - 1, colParam + 1);
      } else {
        newCells[rowParam - 1][colParam + 1].state = CellState.Visible;
      }
    }

    if (
      leftCell?.state === CellState.Open &&
      leftCell.value !== CellValue.Bomb
    ) {
      if (leftCell.value === CellValue.None) {
        newCells = openMultipleCells(newCells, rowParam, colParam - 1);
      } else {
        newCells[rowParam][colParam - 1].state = CellState.Visible;
      }
    }

    if (
      rightCell?.state === CellState.Open &&
      rightCell.value !== CellValue.Bomb
    ) {
      if (rightCell.value === CellValue.None) {
        newCells = openMultipleCells(newCells, rowParam, colParam + 1);
      } else {
        newCells[rowParam][colParam + 1].state = CellState.Visible;
      }
    }

    if (
      bottomLeftCell?.state === CellState.Open &&
      bottomLeftCell.value !== CellValue.Bomb
    ) {
      if (bottomLeftCell.value === CellValue.None) {
        newCells = openMultipleCells(newCells, rowParam + 1, colParam - 1);
      } else {
        newCells[rowParam + 1][colParam - 1].state = CellState.Visible;
      }
    }

    if (
      bottomCell?.state === CellState.Open &&
      bottomCell.value !== CellValue.Bomb
    ) {
      if (bottomCell.value === CellValue.None) {
        newCells = openMultipleCells(newCells, rowParam + 1, colParam);
      } else {
        newCells[rowParam + 1][colParam].state = CellState.Visible;
      }
    }

    if (
      bottomRightCell?.state === CellState.Open &&
      bottomRightCell.value !== CellValue.Bomb
    ) {
      if (bottomRightCell.value === CellValue.None) {
        newCells = openMultipleCells(newCells, rowParam + 1, colParam + 1);
      } else {
        newCells[rowParam + 1][colParam + 1].state = CellState.Visible;
      }
    }

    return newCells;
  };

  return (
    <div className="App">
      <GameSettings />
      <div className="Header">
        <NumberDisplay value={bombCounter} />
        <div className="Face" onClick={handleFaceClick}>
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default GameBoard;
