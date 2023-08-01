import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import MainLayout from '../Layouts/MainLayout';
import NotFound from '../Pages/Error/NotFound';
import CreatePostPage from '../Pages/CreatePostPage';
import IndividualPost from '../Pages/Post/IndividualPost/IndividualPost';
import Login from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

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
  {
    path:'/post',
    element:<CreatePostPage/>,
  },
  { 
  path: '/login',
  element: <Login />,
  },
  { 
  path: '/register',
  element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  
]);

export default router;
