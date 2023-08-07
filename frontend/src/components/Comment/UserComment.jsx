import React, { useContext, useEffect, useState } from 'react';
import styles from './UserComment.module.css';
import { BsThreeDots } from 'react-icons/bs';
import formatDate from '../../Helper/DateFormatter';
import AvatarImage from '../Avatar/AvatarImage';
import { AuthContext } from '../../Context/AuthContext';

function UserComment(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [editCommentBtn, setEditCommentBtn] = useState(false);
  const [comment, setComment] = useState(props.data.content);
  const userCtx = useContext(AuthContext);

  const clickHandler = () => {
    setIsClicked(!isClicked);
  };

  const editComment = () => {
    setEditCommentBtn(!editCommentBtn);
  };

  const commentHandler = async () => {
    try {
      const request = await fetch(
        `http://localhost:4000/api/v1/comment?commentId=${props.data._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ content: comment }),
        }
      );
      const response = await request.json();

      setComment(response.comment.content);
      editComment();
      clickHandler();
    } catch (error) {}
  };

  useEffect(() => {}, [isClicked, editCommentBtn]);

  return (
    <div className={styles['comments-card-container']}>
      <AvatarImage userData={props.data.userId} />

      <div
        className={`${styles['comments-card']} ${
          editCommentBtn ? styles.edit : ''
        }`}
      >
        <div className={styles['comments-card__top']}>
          <p className={styles['comments-card__username']}>
            {props.fullname} <span>{formatDate(props.data.createdAt)}</span>
          </p>
          {props.data.userId._id === userCtx.userData._id && (
            <>
              <button onClick={clickHandler}>
                <BsThreeDots />
              </button>
              {isClicked && !editCommentBtn && (
                <div className={styles['comments__top--option']}>
                  <p
                    onClick={editComment}
                    className={styles['comments-option__items']}
                  >
                    Edit
                  </p>
                  <p
                    className={styles['comments-option__items']}
                    onClick={props.deleteComment}
                  >
                    Delete
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {editCommentBtn && (
          <div className={styles['comments-text-edit']}>
            <textarea
              rows='4'
              className={styles['text-area']}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div>
              <button onClick={commentHandler}>Save</button>
              <button
                onClick={() => {
                  editComment();
                  clickHandler();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <p className={styles['comments-card__content']}>{comment}</p>
      </div>
    </div>
  );
}

export default UserComment;
