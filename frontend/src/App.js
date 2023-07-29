import * as React from 'react';
import RegisterPage from './Pages/RegisterPage.jsx'
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      
    </Router>
  );
}

export default App;