import { useState } from 'react';
import Aside from './components/Aside/Aside';

import './App.css';

function App() {
  const [showAside, setShowAside] = useState(false);

  const asideBtn = () => {
    setShowAside(!showAside);
  };
  return (
    <>
      <button className='aside-toggle' onClick={asideBtn}>
        Click
      </button>
      <Aside showAside={showAside} asideBtn={asideBtn} />
    </>
  );
}

export default App;
