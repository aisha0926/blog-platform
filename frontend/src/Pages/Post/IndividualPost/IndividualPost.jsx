import React from 'react';
import styles from './IndividualPost.module.css';
import Card from '../../../components/Card/Card';

function IndividualPost() {
  return (
    <div className={styles['individual-post-container']}>
      <img
        className={styles['individual-post-container__img']}
        src='https://res.cloudinary.com/practicaldev/image/fetch/s--dlONUBnG--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kzliybm8vqg2kem3mxyg.png'
        alt=''
      />

      <Card className={styles['individual-post-container__card']} />

      <div className={styles['individual-post-container__content']}>
        <p>
          As a beginner to programming, I’ve struggled to understand the
          complexities of GitHub. While I appreciate the basic concept of Git,
          the actual workflow can feel overwhelming at times.
        </p>
        <p>
          My purpose here is not to give a deep or theoretical understanding of
          GitHub, but rather to document the commands you need to merge a branch
          into the master on a shared repository. (Note: this is different from
          making a Pull Request from a forked repository.)
        </p>
        <p>
          If you do want a deeper understanding, I’ve linked to some good
          resources at the bottom of the post.
        </p>
      </div>
    </div>
  );
}

export default IndividualPost;
