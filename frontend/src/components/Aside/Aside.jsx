import React from 'react';
import styles from './Aside.module.css';

function Aside({ showAside, asideBtn }) {
  const toggleAside = () => {
    asideBtn();
  };
  return (
    <>
      <aside
        className={showAside ? `${styles.show} ${styles.active}` : styles.hide}
      >
        <div className={styles['aside-header']}>
          <h1>DEV Community</h1>
          <button className={styles['aside-btn']} onClick={toggleAside}>
            ❌
          </button>
        </div>

        <ul>
          <li>Home</li>
          <li>Listings</li>
          <li>Tags</li>
        </ul>
      </aside>

      <aside>
        <div>
          <h1>DEV Community</h1>
          <button className={styles['aside-btn']} onClick={toggleAside}>
            ❌
          </button>
        </div>

        <ul>
          <li>Home</li>
          <li>Listings</li>
          <li>Tags</li>
        </ul>
      </aside>
    </>
  );
}

export default Aside;
