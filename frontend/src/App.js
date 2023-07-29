import { useState } from 'react';
import Aside from './components/Aside/Aside';

function App() {
  const [showAside, setShowAside] = useState(false);

  const asideBtn = () => {
    setShowAside(!showAside);
  };
  return (
    <>
      <button onClick={asideBtn}>Click</button>
      <Aside showAside={showAside} asideBtn={asideBtn} />
    </>
  );
}

export default App;
