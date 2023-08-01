import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './IndividualPost.module.css';
import Card from '../../../components/Card/Card';
import Comment from '../../../components/Comment/Comment';
import PostContext from '../../../Context/PostContext';
import UserComment from '../../../components/Comment/UserComment';

function IndividualPost() {
  const [content, setContent] = useState();
  const ctx = useContext(PostContext).responseData;
  const [comments, setComments] = useState();
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
    const request = await fetch(`http://localhost:4000/api/v1/comment/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: ctx._id }),
    });

    const response = await request.json();

    response && setComments(response.comments);
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

  const [test, setTest] = useState();

  const something = (data) => {
    setTest(data.comments);
  };

  useEffect(() => {
    if (test) {
      const usercomments = test.map((el) => (
        <UserComment
          key={el._id}
          fullname={`${el.userId.firstName} ${el.userId.lastName}`}
          content={`${el.content}`}
        />
      ));

      setCommentsPlaceholder(usercomments);
      console.log(test);
    }
  }, [test]);

  return (
    <>
      <div className={styles['individual-post-container']}>
        <img
          className={styles['individual-post-container__img']}
          src='https://res.cloudinary.com/practicaldev/image/fetch/s--dlONUBnG--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kzliybm8vqg2kem3mxyg.png'
          alt=''
        />

        <Card className={styles['individual-post-container__card']} />

        <div className={styles['individual-post-container__content']}>
          {content}
        </div>

        <Comment test={something} />

        {comments || test ? commentsPlaceholder : <p>No comment found</p>}
      </div>
    </>
  );
}

export default IndividualPost;
