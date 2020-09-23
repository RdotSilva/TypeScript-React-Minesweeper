import React, { useState } from "react";
import { generateCells } from "../../utils";
import NumberDisplay from "../NumberDisplay";

import "./App.scss";

const App: React.FC = () => {
  const [cells, setCells] = useState(generateCells());

  console.log("cells", cells);
  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
          <span role="img" aria-label="face">
            🙂
          </span>
        </div>
        <NumberDisplay value={23} />
      </div>
      <div className="Body">Body</div>
    </div>
  );
};

export default App;
