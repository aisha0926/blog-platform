import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside/Aside";
import styles from "./MainLayout.module.css";
import Header from "../components/Header/Header";

function MainLayout() {
  return (
    <div className={styles["layout-container"]}>
      <Header />
      <Aside className={styles["layout-container--aside"]} />

      <main className={styles["layout-container--main"]}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
