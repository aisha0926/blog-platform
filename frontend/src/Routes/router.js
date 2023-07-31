import React from 'react';
import { createBrowserRouter, Link } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import MainLayout from '../Layouts/MainLayout';
import NotFound from '../Pages/Error/NotFound';
import CreatePostPage from '../Pages/CreatePostPage';
import IndividualPost from '../Pages/Post/IndividualPost/IndividualPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post',
        element: <IndividualPost />,
      },
    ],
  },
  // {
  //   path: '/login',
  //   element: <Login />,
  // },
  {
    path: '*',
    element: <NotFound />,
  },
  {
      path:'/post',
      element:<CreatePostPage/>,
  },
]);

export default router;
