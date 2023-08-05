import React, { useContext, useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import styles from './Comment.module.css';
import { PostContext } from '../../Context/PostContext';
import AvatarImage from '../Avatar/AvatarImage';

function Comment(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [textArea, setTextArea] = useState('');
  const ctx = useContext(PostContext);

  const clickHandler = () => {
    setIsClicked(true);
  };

  const submitComment = async () => {
    const request = await fetch(
      `http://localhost:4000/api/v1/comment/${ctx.responseData._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI5NTRkMzQ1MzhmOGRjN2Y2YWYxOTYiLCJpYXQiOjE2OTA2MDI4NjF9.86hTHpIyjtR63JUM9P2qiHD964eUB-5aIo8kRapkZYM',
        },
        body: JSON.stringify({ content: textArea }),
      }
    );

    const response = await request.json();

    if (response) {
      const request = await fetch(
        `http://localhost:4000/api/v1/comment/all/${ctx.responseData._id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const getComments = await request.json();

      getComments && props.comment(getComments);
    }

    setTextArea('');
    setIsClicked(false);
  };

  useEffect(() => {
    textArea.length > 0 && setIsActive(true);
  }, [textArea]);

  return (
    <div className={styles['comment-container']}>
      <div className={styles['comment-container__top']}>
        <h3>Comments</h3>
        <button>
          <AiFillHeart />
        </button>
      </div>

      <div className={styles['comment-container__bottom']}>
        {/* <img
          src='https://res.cloudinary.com/practicaldev/image/fetch/s--vdjuNWyV--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/719106/6b2639f4-26ed-4596-a072-281a536101ed.png'
          alt=''
        /> */}

        <AvatarImage />

        <div className={styles['text-container']}>
          <textarea
            rows='4'
            className={styles['text-area']}
            onClick={clickHandler}
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
          {isClicked && (
            <div className='button-container'>
              <button
                className={`${styles['comment-btn']} ${
                  styles[isActive ? 'active' : 'inactive']
                }`}
                onClick={isActive ? submitComment : undefined}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;