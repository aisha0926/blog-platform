import * as React from 'react';
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';
import EditPostPage from './Pages/EditPostPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/editpost" element={<EditPostPage />} />

      </Routes>
      
    </Router>
  );
}

export default App;