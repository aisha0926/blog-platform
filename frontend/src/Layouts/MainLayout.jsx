import React from "react";
import { Outlet } from "react-router-dom";
import Register from '../Pages/RegisterPage';

const MainLayout = () => {
  return (
    <>
      <header>
        {/* <Header /> */}
      </header>
      <main>
        <Outlet />
        <Register/>
      </main>
      <footer>
        {/* <Footer /> */}
      </footer>
    </>
  );
};

export default MainLayout;
