import React from "react";
import Header from "../Pages/Header/Header";
import Footer from "../Pages/Footer/Footer";
import { Outlet } from "react-router";

function Root() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default Root;
