import React, { useContext, useEffect } from 'react';
import styles from './Card.module.css';
import { PostContext } from '../../Context/PostContext';
import DateFormatter from '../../Helper/DateFormatter';
import AvatarImage from '../Avatar/AvatarImage';

import { TfiCommentsSmiley } from 'react-icons/tfi';

export default function Card(props) {
  const classes = styles.card + ' ' + props.className;
  const ctx = useContext(PostContext);

  const formattedDate = DateFormatter(
    ctx.responseData
      ? ctx.responseData.postData.createdAt
      : props.data.createdAt
  );

  useEffect(() => {
    console.log(ctx);
    console.log(props);
  }, []);

  return (
    <div className={classes} onClick={props.onClick}>
      <div className={styles['card-header']}>
        <AvatarImage
          userData={
            ctx.responseData
              ? ctx.responseData.postData.author
              : props.data.author
          }
        />

        <div className={styles['card-header__user']}>
          <p className={styles['card-header__user--username']}>
            {ctx.responseData
              ? `${ctx.responseData.postData.author.firstName} ${ctx.responseData.postData.author.lastName}`
              : `${props.data.author.firstName} ${props.data.author.lastName}`}
          </p>
          <p className={styles['card-header__user--data']}>
            {/* July 10 (5 days ago) */}
            {formattedDate}
          </p>
        </div>
      </div>

      <div className={styles['card-content']}>
        <h1 className={styles['card-content__header']}>
          {ctx.responseData
            ? ctx.responseData.postData.title
            : props.data.title}
        </h1>

        <div className={styles['card-content__tags']}>
          <p>#webdev</p>
          <p>#beginners</p>
          <p>#opensource</p>
          {/* {ctx.responseData &&
            Array.isArray(ctx.responseData.postData.tags) &&
            ctx.responseData.postData.tags.map((el, i) => {
              return <p key={`tag-${el}-${i}`}>{el}</p>;
            })} */}
        </div>

        <div className={styles['card-content__bottom']}>
          <div className={styles['card-content--reactions']}>
            <span>❤</span>
            <span>🥰</span>
            <span>🔥</span>
            <span>110 Reactions</span>
          </div>

          <div className={styles['card-content--comment']}>
            <span>
              <TfiCommentsSmiley size='1.3rem' />
            </span>
            <span>{props.commentsCount ?? '0'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
