import React from "react";

import "./GameSettings.scss";

const GameSettings: React.FC = () => {
  return (
    <div className="GameSettings">
      <div className="TopBar">
        <p>Height</p>
        <p>Width</p>
        <p>Mines</p>
      </div>
      <button className="DifficultyButton">Beginner</button>
      <button className="DifficultyButton">Intermediate</button>
      <button className="DifficultyButton">Advanced</button>
    </div>
  );
};

export default GameSettings;
