import { useState } from "react";
import Aside from "./components/Aside/Aside";
import AppRouter from "./Routes/AppRouter";
import "./App.css";

function App() {
  const [showAside, setShowAside] = useState(false);

  const asideBtn = () => {
    setShowAside(!showAside);
  };
  // need  logic to handle login state
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <>
        <button className="aside-toggle" onClick={asideBtn}>
          Click
        </button>
        <Aside showAside={showAside} asideBtn={asideBtn} />
      </>
      <div className="app">
        {/* render the AppRouter component and pass the loggedIn state and setLoggedIn function as props */}
        <AppRouter loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
    </>
  );
}

export default App;
