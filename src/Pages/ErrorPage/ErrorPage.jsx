import React from "react";
import ErrorImg from "../../../public/img/error-404.png";
import { Link } from "react-router";

function ErrorPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-10">
        <img loading="lazy" src={ErrorImg} alt="" />

        <h2 className="font-bold text-5xl text-red-500 py-5">Page Not Found</h2>

        <Link className="btn bg-[#6453F7] text-[#ffffff] " to="/">
          Go Back
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;
