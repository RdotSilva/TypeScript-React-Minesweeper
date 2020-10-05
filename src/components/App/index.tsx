import React, { useState, useEffect } from "react";
import { generateCells, openMultipleCells } from "../../utils";
import NumberDisplay from "../NumberDisplay";
import "./App.scss";
import Button from "./../Button/index";
import { Face, Cell, CellState, CellValue } from "../../types";
import { MAX_COLS, MAX_ROWS } from "../../constants";

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.Smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Face.Oh);
    };

    const handleMouseUp = (): void => {
      setFace(Face.Smile);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Increment the timer if player is alive
  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => setTime(time + 1), 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  // Check if user has lost the game and if so stop the game
  useEffect(() => {
    if (hasLost) {
      setFace(Face.Lost);
      setLive(false);
    }
  }, [hasLost]);

  // Check if user has won game
  useEffect(() => {
    if (hasWon) {
      setLive(false);
      setFace(Face.Won);
    }
  }, [hasWon]);

  // Reset game and clear board
  const handleFaceClick = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells);
    setHasLost(false);
    setHasWon(false);
  };

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    const currentCell = cells[rowParam][colParam];
    let newCells = cells.slice();

    // Start game
    if (!live) {
      if (currentCell.value === CellValue.Bomb) {
        // TODO: Shuffle board if bomb is clicked
      }
      setLive(true);
    }

    if ([CellState.Flagged, CellState.Visible].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.Bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.None) {
      // Spread empty cells if no bombs present
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.Visible;
    }
    // Check to see if you have won
    let safeOpenCellsExists = false;

    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = newCells[row][col];

        if (
          currentCell.value !== CellValue.Bomb &&
          currentCell.state === CellState.Open
        ) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }

    if (!safeOpenCellsExists) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.Bomb) {
            return {
              ...cell,
              state: CellState.Flagged,
            };
          }
          return cell;
        })
      );
      setHasWon(true);
    }
    setCells(newCells);
  };

  const handleCellContext = (rowParam: number, colParam: number) => (
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    e.preventDefault();

    if (!live) {
      return;
    }

    const currentCells = cells.slice();
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.Visible) {
      return;
    } else if (currentCell.state === CellState.Open) {
      currentCells[rowParam][colParam].state = CellState.Flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.Flagged) {
      currentCells[rowParam][colParam].state = CellState.Open;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          onClick={handleCellClick}
          onContext={handleCellContext}
          red={cell.red}
          state={cell.state}
          value={cell.value}
          row={rowIndex}
          col={colIndex}
        />
      ))
    );
  };

  /**
   * Show all bombs on screen
   * @returns {Cell[][]}
   */
  const showAllBombs = (): Cell[][] => {
    const currentCells = cells.slice();
    return currentCells.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.Bomb) {
          return {
            ...cell,
            state: CellState.Visible,
          };
        }
        return cell;
      })
    );
  };

  return (
    <div className="App">
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

export default App;
