import React from "react";
import NumberDisplay from "../NumberDisplay";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="Header"></div>
      <NumberDisplay value={0} />
      <NumberDisplay value={23} />
      <div className="Body"></div>
    </div>
  );
};

export default App;
