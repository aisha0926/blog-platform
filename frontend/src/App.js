import * as React from 'react';
import LoginPage from './Pages/LoginPage.jsx';
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';
import { useState } from 'react';
import Aside from './components/Aside/Aside.jsx';

import './App.css';

function App() {

  
  const [showAside, setShowAside] = useState(false);

  const asideBtn = () => {
    setShowAside(!showAside);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <>
      <button className='aside-toggle' onClick={asideBtn}>
        Click
      </button>
      <Aside showAside={showAside} asideBtn={asideBtn} />
    </>
      
    </Router>);

}

export default App;