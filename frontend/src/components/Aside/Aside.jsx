import React, { useEffect, useState } from 'react';
import styles from './Aside.module.css';
import { AiOutlineHome, AiOutlineTags, AiOutlineBulb } from 'react-icons/ai';
import { GrCircleInformation } from 'react-icons/gr';

function Aside({ className }) {
  const [tags, setTags] = useState();
  const [uiTags, setUiTags] = useState();

  const getTags = async () => {
    const request = await fetch('http://localhost:4000/api/v1/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response = await request.json();

    setTags(response.tags);
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (tags) {
      const tagsMap = tags.map((el) => <li key={el._id}>#{el.name}</li>);
      setUiTags(tagsMap);
    }
  }, [tags]);

  return (
    <>
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
            {uiTags}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Aside;
