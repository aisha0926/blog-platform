import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside/Aside';
import styles from './MainLayout.module.css';

function MainLayout() {
  return (
    <div className={styles['layout-container']}>
      <Aside className={styles['layout-container--aside']} />

      <main className={styles['layout-container--main']}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

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
