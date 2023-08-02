import React from 'react';
import styles from './UserComment.module.css';
import { BsThreeDots } from 'react-icons/bs';

function UserComment(props) {
  const clickHandler = () => {
    console.log(props);
  };
  return (
    <div className={styles['comments-card-container']}>
      <img
        src='https://trello-members.s3.amazonaws.com/5b239ad609702314f72a289e/34d874155a871128569bbffaad690e88/50.png'
        alt=''
      />
      <div className={styles['comments-card']}>
        <div className={styles['comments-card__top']}>
          <p className={styles['comments-card__username']}>{props.fullname}</p>
          <button onClick={clickHandler}>
            <BsThreeDots />
          </button>
        </div>
        <p className={styles['comments-card__content']}>{props.content}</p>
      </div>
    </div>
  );
}

export default UserComment;
