import React from 'react';
import { createBrowserRouter, Link } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import MainLayout from '../Layouts/MainLayout';
import NotFound from '../Pages/Error/NotFound';
import CreatePostPage from '../Pages/CreatePostPage';

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
        path:'/post',
        element:<CreatePostPage/>,
      }
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
]);

export default router;
