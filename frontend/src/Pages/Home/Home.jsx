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

  const [tokenAvailable, setTokenAvailable]= useState(false);

  const getTags = async () => {
    const token = localStorage.getItem('token');
    if (!token){
      console.error('Token not available')
      return;
    }

    const request = await fetch('http://localhost:4000/api/v1/post/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ${token}`,
      },
    });

    const response = await request.json();

    setData(response.data);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setTokenAvailable(true);
    }
  }, []);

  useEffect(() => {
    getTags();
  }, [tokenAvailable]); // Fetch data only when the token becomes available

  useEffect(() => {
    if (currentPath === '/') {
      ctx.setResponseData();
    }
  }, [currentPath]);

  useEffect(() => {
    if (data) {
      const cardsData = async (data) => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not available');
          return;
        }

        try {
          const response = await fetch(
            `http://localhost:4000/api/v1/post/public/${data._id}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error('Failed to fetch individual post');
          }

          const postData = await response.json();
          navigate('/post');
          ctx.setResponseData(postData);
        } catch (error) {
          console.error('Error fetching individual post:', error);
        }
      };

      // navigate to the post but pass the data down
      const cardsMap = data.map((el) => (
        <Card key={el._id} onClick={() => cardsData(el)} data={el} />
      ));
      setCards(cardsMap);
    }
  }, [data]);

  return (
    <>
      <h1>Homepage</h1>
      {cards}
    </>
  );
}

export default Home;
