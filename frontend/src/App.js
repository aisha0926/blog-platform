import * as React from 'react';
import RegisterPage from './Pages/RegisterPage.jsx'
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';
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
    <Router>
      <Routes> 
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
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
      
    </Router>
  );
};


export default App;