import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from "../constants";
import { Cell, CellState, CellValue } from "../types";

export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];
  let bombsPlaced = 0;

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.None,
        state: CellState.Open,
      });
    }
  }

  // Generate cells containing bombs
  while (bombsPlaced < NO_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLS);
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
  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value === CellValue.Bomb) {
        continue;
      }
      let numberOfBombs = 0;
      const topLeftCell =
        rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
      const topCell = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
      const topRightCell =
        rowIndex > 0 && colIndex < MAX_COLS - 1
          ? cells[rowIndex - 1][colIndex + 1]
          : null;
      const leftCell = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
      const rightCell =
        colIndex < MAX_COLS - 1 ? cells[rowIndex][colIndex + 1] : null;
      const bottomLeftCell =
        rowIndex < MAX_ROWS - 1 && colIndex > 0
          ? cells[rowIndex + 1][colIndex - 1]
          : null;
      const bottomCell =
        rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null;
      const bottomRightCell =
        rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLS - 1
          ? cells[rowIndex + 1][colIndex + 1]
          : null;

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

export const openMultipleCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number
): Cell[][] => {};
