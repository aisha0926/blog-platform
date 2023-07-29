import * as React from 'react';
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';
import CreatePostPage from './Pages/CreatePostPage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createpost" element={<CreatePostPage />} />
      </Routes>
      
    </Router>
  );
}

export default App;