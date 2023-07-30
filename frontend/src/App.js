import { useState } from "react";
import Aside from "./components/Aside/Aside";

import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const [showAside, setShowAside] = useState(false);

  const asideBtn = () => {
    setShowAside(!showAside);
  };

  return (
    <>
      <Header />
      <button className="aside-toggle" onClick={asideBtn}>
        Click
      </button>
      <Aside showAside={showAside} asideBtn={asideBtn} />
    </>
  );
}

export default App;
