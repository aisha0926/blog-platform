import React, { useEffect, useState } from 'react';
import styles from './UserComment.module.css';
import { BsThreeDots } from 'react-icons/bs';
import formatDate from '../../Helper/DateFormatter';

function UserComment(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [editCommentBtn, setEditCommentBtn] = useState(false);
  const [comment, setComment] = useState(props.data.content);

  useEffect(() => {
    console.log(props);
  }, []);
  // const clickHandler = () => {
  //   setIsClicked(!isClicked);
  // };

  // const editComment = () => {
  //   setEditCommentBtn(!editCommentBtn);
  // };

  // const commentHandler = async () => {
  //   try {
  //     const request = await fetch(
  //       `http://localhost:4000/api/v1/comment?commentId=${props.data._id}`,
  //       {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization:
  //             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI5NTRkMzQ1MzhmOGRjN2Y2YWYxOTYiLCJpYXQiOjE2OTA2MDI4NjF9.86hTHpIyjtR63JUM9P2qiHD964eUB-5aIo8kRapkZYM',
  //         },
  //         body: JSON.stringify({ content: comment }),
  //       }
  //     );

  //     const response = await request.json();

  //     setComment(response.comment.content);

  //     editComment();
  //     clickHandler();
  //   } catch (error) {}
  // };

  // useEffect(() => {}, [isClicked, editCommentBtn]);

  // return (
  //   <div className={styles['comments-card-container']}>
  //     <img
  //       src='https://trello-members.s3.amazonaws.com/5b239ad609702314f72a289e/34d874155a871128569bbffaad690e88/50.png'
  //       alt=''
  //     />
  //     <div
  //       className={`${styles['comments-card']} ${
  //         editCommentBtn ? styles.edit : ''
  //       }`}
  //     >
  //       <div className={styles['comments-card__top']}>
  //         <p className={styles['comments-card__username']}>
  //           {props.fullname} <span>{formatDate(props.data.createdAt)}</span>
  //         </p>
  //         <button onClick={clickHandler}>
  //           <BsThreeDots />
  //         </button>
  //         {isClicked && !editCommentBtn && (
  //           <div className={styles['comments__top--option']}>
  //             <p
  //               onClick={editComment}
  //               className={styles['comments-option__items']}
  //             >
  //               Edit
  //             </p>
  //             <p
  //               className={styles['comments-option__items']}
  //               onClick={props.deleteComment}
  //             >
  //               Delete
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //       {editCommentBtn && (
  //         <div className={styles['comments-text-edit']}>
  //           <textarea
  //             rows='4'
  //             className={styles['text-area']}
  //             value={comment}
  //             onChange={(e) => setComment(e.target.value)}
  //           />
  //           <div>
  //             <button onClick={commentHandler}>Save</button>
  //             <button
  //               onClick={() => {
  //                 editComment();
  //                 clickHandler();
  //               }}
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </div>
  //       )}

  //       <p className={styles['comments-card__content']}>{comment}</p>
  //     </div>
  //   </div>
  // );
}

export default UserComment;
