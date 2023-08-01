import React, { useContext, useEffect, useState } from 'react';
import styles from './IndividualPost.module.css';
import Card from '../../../components/Card/Card';
import Comment from '../../../components/Comment/Comment';
import { PostContext } from '../../../Context/PostContext';

function IndividualPost() {
  const [content, setContent] = useState();
  const ctx = useContext(PostContext);

  useEffect(() => {
    // const nextLineIndex = ctx.responseData.content.indexOf('\n');
    // let test = [...ctx.responseData.content];
    // test[nextLineIndex + 1] = '<br>';
    // setContent(test.join(',').replaceAll(',', ''));

    const nextLine = ctx.responseData.content.split('\n');
    const paragraph = nextLine.map(
      (el, i) =>
        el.length > 0 && (
          <p className={styles['paragraph-content']} key={i}>
            {el}
          </p>
        )
    );
    setContent(paragraph);
  }, [ctx.responseData]);

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

        <Comment />
      </div>
    </>
  );
}

export default IndividualPost;
