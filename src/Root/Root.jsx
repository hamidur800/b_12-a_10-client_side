import React from "react";
import Header from "../Pages/Header/Header";
import { Outlet } from "react-router";
import Footer from "../Pages/Footer/Footer";
import "./Root.css";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
