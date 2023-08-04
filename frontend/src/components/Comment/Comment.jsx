import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import styles from './Comment.module.css';

function Comment() {
  return (
    <div className={styles['comment-container']}>
      <div className={styles['comment-container__top']}>
        <h3>Comments</h3>
        <button>
          <AiFillHeart />
        </button>
      </div>

      <div className={styles['comment-container__bottom']}>
        <img
          src='https://res.cloudinary.com/practicaldev/image/fetch/s--vdjuNWyV--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/719106/6b2639f4-26ed-4596-a072-281a536101ed.png'
          alt=''
        />

        <textarea rows='4' className={styles['text-area']} />
      </div>
    </div>
  );
}

export default Comment;