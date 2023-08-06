import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import MainLayout from '../Layouts/MainLayout';
import NotFound from '../Pages/Error/NotFound';
import CreatePostPage from '../Pages/CreatePostPage';
import IndividualPost from '../Pages/Post/IndividualPost/IndividualPost';
import LoginPage from '../Pages/LoginPage';
import UserProfileMe from '../Pages/UserProfileMe';
import UpdateProfile from '../Pages/UpdateProfile';
import RegisterPage from '../Pages/RegisterPage';
import UserProfile from '../Pages/UserProfile';

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
      {
        path: '/myprofile',
        element: <UserProfileMe />,
      },

      {
        path: '/editprofile',
        element: <UpdateProfile />,
      },
      {
        path: '/createpost',
        element: <CreatePostPage />,
      },

      {
        path: '/profile',
        element: <UserProfile />,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  {
    path: '/login',
    element: <LoginPage />,
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
