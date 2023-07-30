import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
//import and change the eleemnt based on the name of the pade
const AppRouter = ({ loggedIn, setLoggedIn }) => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/post" element={<Post />} />
          {loggedIn ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />
              <Route path="/createPost" element={<CreatePostPage />} />
              <Route path="/editPost" element={<EditPostPage />} />
              <Route path="/post" element={<Post />} />
            </>
          ) : (
            <Route path="*" element={<NotFoundPage />} />
          )}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
