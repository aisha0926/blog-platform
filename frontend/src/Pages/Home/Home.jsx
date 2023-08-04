import React, { useContext, useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { PostContext } from '../../Context/PostContext';

function Home() {
  const [data, setData] = useState();
  const [cards, setCards] = useState();
  const ctx = useContext(PostContext);

  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const getPosts = async () => {
    const request = await fetch('http://localhost:4000/api/v1/post/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI5NTRkMzQ1MzhmOGRjN2Y2YWYxOTYiLCJpYXQiOjE2OTA2MDI4NjF9.86hTHpIyjtR63JUM9P2qiHD964eUB-5aIo8kRapkZYM ',
      },
    });

    const response = await request.json();

    setData(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // useEffect(() => {
  //   if (currentPath === '/') {
  //     ctx.setResponseData();
  //   }
  // }, [currentPath]);

  useEffect(() => {
    if (data) {
      const cardsData = async (data) => {
        const request = await fetch(
          `http://localhost:4000/api/v1/post/public/${data._id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI5NTRkMzQ1MzhmOGRjN2Y2YWYxOTYiLCJpYXQiOjE2OTA2MDI4NjF9.86hTHpIyjtR63JUM9P2qiHD964eUB-5aIo8kRapkZYM ',
            },
          }
        );

        const response = await request.json();

        navigate('/post');

        console.log('response', response);
        // ctx.setResponseData(response.postData);
        ctx.setResponseData(response);
      };

      // console.log('data', data);

      // console.log('ctx', ctx);
      // navigate to the post but pass the data down
      const cardsMap = data.map((el) => {
        return (
          <Card
            key={el._id}
            onClick={() => cardsData(el)}
            data={el}
            commentsCount={el.comments.length}
          />
        );
      });
      setCards(cardsMap);
    }
  }, [data]);

  return <>{cards}</>;
}

export default Home;
