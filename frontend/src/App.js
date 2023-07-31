import { RouterProvider } from 'react-router-dom';
import router from './Routes/router';
import './App.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;

/* 
import { useState } from 'react';
import Aside from './components/Aside/Aside';
const [showAside, setShowAside] = useState(false);

const asideBtn = () => {
  setShowAside(!showAside);
};
 <button className="aside-toggle" onClick={asideBtn}>
        Click
      </button>
      <Aside showAside={showAside} asideBtn={asideBtn} />
*/
