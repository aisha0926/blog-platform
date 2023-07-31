<<<<<<< HEAD
import * as React from 'react';
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
};

=======
import { RouterProvider } from 'react-router-dom';
import router from './Routes/router';
import './App.css';

function App() {
  return <RouterProvider router={router} />;
}
>>>>>>> 5d032f4b3d39fa9d516840e0bb9c5d2d3cb37bfd

export default App;
