import { RouterProvider } from 'react-router-dom';
import router from './Routes/router';
import './App.css';
import PostContextProvider from './Context/PostContext';

function App() {
  return (
    <PostContextProvider>
      <RouterProvider router={router} />
    </PostContextProvider>
  );
}

export default App;
