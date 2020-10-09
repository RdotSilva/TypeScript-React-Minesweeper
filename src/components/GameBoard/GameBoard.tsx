import React, { useState, useContext } from "react";
import gameSettingsContext from "../../context/gameSettings/gameSettingsContext";
import { Cell, CellState, CellValue } from "../../types";

import "./GameBoard.scss";

const GameBoard: React.FC = () => {
  const context = useContext(gameSettingsContext);
  const { height, width, mines } = context;

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

  return <div className="GameSettings"></div>;
};

export default GameBoard;
