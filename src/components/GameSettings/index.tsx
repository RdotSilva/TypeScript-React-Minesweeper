import React, { useState } from "react";

import "./GameSettings.scss";

const GameSettings: React.FC = () => {
  const [width, setWidth] = useState<number>(9);
  const [height, setHeight] = useState<number>(9);
  const [mines, setMines] = useState<number>(10);

  const onClickBeginner = () => {
    setWidth(9);
    setHeight(9);
    setMines(10);
  };

  return (
    <div className="GameSettings">
      <div className="TopBar">
        <p>Height: {height}</p>
        <p>Width: {width}</p>
        <p>Mines: {mines}</p>
      </div>
      <button className="DifficultyButton" onClick={onClickBeginner}>
        Beginner
      </button>
      <button className="DifficultyButton">Intermediate</button>
      <button className="DifficultyButton">Advanced</button>
    </div>
  );
};

export default GameSettings;
