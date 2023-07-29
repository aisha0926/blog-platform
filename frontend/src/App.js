import * as React from 'react';
import LoginPage from './Pages/LoginPage.jsx';
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      
    </Router>
  );
}

export default App;