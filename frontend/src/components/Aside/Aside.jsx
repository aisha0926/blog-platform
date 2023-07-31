import React from 'react';
import styles from './Aside.module.css';
import { AiOutlineHome, AiOutlineTags, AiOutlineBulb } from 'react-icons/ai';
import { GrCircleInformation } from 'react-icons/gr';

function Aside({ showAside, asideBtn, className }) {
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

        <ul className={styles['aside-list']}>
          <li>
            <AiOutlineHome />
            Home
          </li>
          <li>
            <AiOutlineTags />
            Tags
          </li>
          <li>
            <AiOutlineBulb />
            FAQ
          </li>
          <li>
            <GrCircleInformation />
            About
          </li>
        </ul>
      </aside>

      <aside className={styles[`${className}`]}>
        <ul className={styles['aside-list']}>
          <li>
            <AiOutlineHome />
            Home
          </li>
          <li>
            <AiOutlineTags />
            Tags
          </li>
          <li>
            <AiOutlineBulb />
            FAQ
          </li>
          <li>
            <GrCircleInformation />
            About
          </li>
        </ul>

        <div>
          <p className={styles['aside-heading']}>My Tags</p>

          <ul className={`${styles['aside-list']} ${styles['aside-tags']}`}>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
            <li>#javascript</li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Aside;
