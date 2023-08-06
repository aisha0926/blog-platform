import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './IndividualPost.module.css';
import Card from '../../../components/Card/Card';
import Comment from '../../../components/Comment/Comment';
import { PostContext } from '../../../Context/PostContext';
import UserComment from '../../../components/Comment/UserComment';

function IndividualPost() {
  const ctx = useContext(PostContext).responseData;
  const [commentsRequest, setCommentsRequest] = useState();
  const [comment, setComment] = useState();

  const [commentsPlaceholder, setCommentsPlaceholder] = useState();

  useEffect(() => {
    // Scroll to the top of the page on page load
    window.scrollTo(0, 0);
  }, []);

  const getComments = async () => {
    const request = await fetch(
      `http://localhost:4000/api/v1/post/public/${ctx.postData._id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const response = await request.json();

    setCommentsRequest(response);
  };

  useEffect(() => {
    getComments();
  }, [comment]);

  const commentHandler = (data) => {
    setComment(data.commentsList);
  };

  const deleteComment = async (el) => {
    try {
      await fetch(`http://localhost:4000/api/v1/comment?commentId=${el._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      getComments();
    } catch (error) {}
  };

  useEffect(() => {
    if (commentsRequest) {
      const userCommentsData = comment ?? commentsRequest.commentsList;
      if (Array.isArray(userCommentsData)) {
        const usercomments = userCommentsData.map((el) => {
          return (
            <UserComment
              key={el._id}
              fullname={`${el.userId.firstName} ${el.userId.lastName}`}
              content={`${el.content}`}
              data={el}
              deleteComment={() => deleteComment(el)}
            />
          );
        });
        setCommentsPlaceholder(usercomments);
      }
    }
  }, [comment, commentsRequest]);

  return (
    <>
      <div className={styles['individual-post-container']}>
        <img
          className={styles['individual-post-container__img']}
          src='https://res.cloudinary.com/practicaldev/image/fetch/s--dlONUBnG--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kzliybm8vqg2kem3mxyg.png'
          alt=''
        />

        <Card className={styles['individual-post-container__card']} />

        <div
          className={styles['individual-post-container__content']}
          dangerouslySetInnerHTML={{ __html: ctx.postData.content }}
        ></div>

        <Comment comment={commentHandler} data={ctx.responseData} />

        {commentsRequest && commentsRequest.commentsList.length > 0 ? (
          commentsPlaceholder
        ) : (
          <p>No comment found</p>
        )}
      </div>
    </>
  );
}

export default IndividualPost;
