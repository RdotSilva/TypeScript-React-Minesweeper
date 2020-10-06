import React from "react";

import "./ScoreBoard.scss";

interface ScoreBoardProps {
  topPlayer: string;
  bottomPlayer: string;
}

const ScoreBoard: React.FC<ScoreBoardProps> = () => {
  return (
    <div className="ScoreBoard">
      <div>Top 10 Players: </div>
      <div className="Top">Top Player</div>
      <div className="Bottom">Bottom Player</div>;
    </div>
  );
};

export default ScoreBoard;
