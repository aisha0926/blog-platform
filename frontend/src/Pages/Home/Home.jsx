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

  const getTags = async () => {
    const request = await fetch('http://localhost:4000/api/v1/post/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const response = await request.json();
    console.log(response);
    setData(response.data);
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (currentPath === '/') {
      ctx.setResponseData();
    }
  }, [currentPath]);

  useEffect(() => {
    if (data) {
      const cardsData = async (data) => {
        // console.log(data._id);
        const request = await fetch(
          `http://localhost:4000/api/v1/post/public/${data._id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const response = await request.json();
        // console.log(response);

        navigate('/post');

        ctx.setResponseData(response.postData);
      };

      // console.log(data);

      // navigate to the post but pass the data down
      const cardsMap = data.map((el) => {
        // console.log(el);
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
