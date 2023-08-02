import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './IndividualPost.module.css';
import Card from '../../../components/Card/Card';
import Comment from '../../../components/Comment/Comment';
import { PostContext } from '../../../Context/PostContext';
import UserComment from '../../../components/Comment/UserComment';
import AvatarImage from '../../../components/Avatar/AvatarImage';

function IndividualPost() {
  const [content, setContent] = useState();
  const ctx = useContext(PostContext).responseData;
  const [commentsRequest, setCommentsRequest] = useState();
  const [comment, setComment] = useState();
  const isFirstRender = useRef(true);
  const [commentsPlaceholder, setCommentsPlaceholder] = useState();

  useEffect(() => {
    const nextLine = ctx.content.split('\n');
    const paragraph = nextLine.map(
      (el, i) =>
        el.length > 0 && (
          <p className={styles['paragraph-content']} key={i}>
            {el}
          </p>
        )
    );
    setContent(paragraph);
  }, [ctx]);

  const getComments = async () => {
    const request = await fetch(
      `http://localhost:4000/api/v1/comment/all/${ctx._id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const response = await request.json();

    console.log(response);

    response && setCommentsRequest(response.comments);
  };

  useEffect(() => {
    // Skip the first render (component mount) to avoid infinite loop
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      // Call getComments for subsequent renders
      getComments();
    }
  }, []);

  const commentHandler = (data) => {
    setComment(data.comments);
  };

  useEffect(() => {
    const userCommentsData = comment ?? commentsRequest;
    if (Array.isArray(userCommentsData)) {
      const usercomments = userCommentsData.map((el) => (
        <UserComment
          key={el._id}
          fullname={`${el.userId.firstName} ${el.userId.lastName}`}
          content={`${el.content}`}
          data={el}
        />
      ));
      setCommentsPlaceholder(usercomments);
    }
  }, [comment, commentsRequest]);

  return (
    <>
      <div className={styles['individual-post-container']}>
        {/* <img
          className={styles['individual-post-container__img']}
          src='https://res.cloudinary.com/practicaldev/image/fetch/s--dlONUBnG--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kzliybm8vqg2kem3mxyg.png'
          alt=''
        /> */}

        {/* <AvatarImage /> */}

        <Card className={styles['individual-post-container__card']} />

        <div className={styles['individual-post-container__content']}>
          {content}
        </div>

        <Comment comment={commentHandler} />

        {commentsRequest ? commentsPlaceholder : <p>No comment found</p>}
      </div>
    </>
  );
}

export default IndividualPost;
