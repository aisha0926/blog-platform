import React from 'react';
import { createBrowserRouter, Link } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import MainLayout from '../Layouts/MainLayout';
import NotFound from '../Pages/Error/NotFound';
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
    path: '*',
    element: <NotFound />,
  },
  { 
    path: '/login',
    element: <Login />,
  },
  { 
    path: '/register',
    element: <RegisterPage />,
  },
]);

export default router;
