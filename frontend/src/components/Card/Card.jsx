import React from 'react';
import styles from './Card.module.css';

export default function Card(props) {
  const classes = styles.card + ' ' + props.className;

  return (
    <div className={classes}>
      <div className={styles['card-header']}>
        <img
          className={styles['card-header__avatar']}
          src='https://res.cloudinary.com/practicaldev/image/fetch/s--GtuTkfSe--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/7624/cb682b98-f3a6-4c3a-bc8a-9aa94f18c3d6.jpg'
          alt='avatar'
        />
        <div className={styles['card-header__user']}>
          <p className={styles['card-header__user--username']}>Kara Luton</p>
          <p className={styles['card-header__user--data']}>
            July 10 (5 days ago)
          </p>
        </div>
      </div>

      <div className={styles['card-content']}>
        <h1 className={styles['card-content__header']}>
          A guide to pull request
        </h1>

        <div className={styles['card-content__tags']}>
          <p>#webdev</p>
          <p>#beginners</p>
          <p>#opensource</p>
        </div>

        <div className={styles['card-content__bottom']}>
          <div className={styles['card-content--reactions']}>
            <span>❤</span>
            <span>🥰</span>
            <span>🔥</span>
            <span>110 Reactions</span>
          </div>

          <div className={styles['card-content--comment']}>
            <span>💭</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
