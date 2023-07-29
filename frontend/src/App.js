import * as React from 'react';
import LoginPage from './Pages/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx'
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';
import CreatePostPage from './Pages/CreatePostPage.jsx';
import EditPostPage from './Pages/EditPostPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createpost" element={<CreatePostPage />} />
        <Route path="/editpost" element={<EditPostPage />} />

      </Routes>
      
    </Router>
  );
}

export default App;