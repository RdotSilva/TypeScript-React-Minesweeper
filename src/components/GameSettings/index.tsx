import React, { useState } from "react";

import "./GameSettings.scss";

const GameSettings: React.FC = () => {
  const [width, setWidth] = useState<number>(9);
  const [height, setHeight] = useState<number>(9);
  const [mines, setMines] = useState<number>(10);

  const onClickDifficulty = (e) => {
    if (e.target.innerText === "Beginner") {
      setWidth(9);
      setHeight(9);
      setMines(10);
    } else if (e.target.innerText === "Intermediate") {
      setWidth(16);
      setHeight(16);
      setMines(40);
    } else {
      setWidth(30);
      setHeight(16);
      setMines(99);
    }
  };

  return (
    <div className="GameSettings">
      <div className="TopBar">
        <p>Height: {height}</p>
        <p>Width: {width}</p>
        <p>Mines: {mines}</p>
      </div>
      <div className="DifficultyButtons">
        <button className="DifficultyButton" onClick={onClickDifficulty}>
          Beginner
        </button>
        <button className="DifficultyButton" onClick={onClickDifficulty}>
          Intermediate
        </button>
        <button className="DifficultyButton" onClick={onClickDifficulty}>
          Advanced
        </button>
      </div>
    </div>
  );
};

export default GameSettings;
