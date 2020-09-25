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

  return cells;
};
