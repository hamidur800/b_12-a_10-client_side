import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet";

function Alltoys() {
  const alltoys = useLoaderData();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>All Properties | HOME-NEST</title>
      </Helmet>
      <>
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {alltoys.map((alltoy) => (
            <div key={alltoy.toyId} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  loading="lazy"
                  src={alltoy.pictureURL}
                  alt={alltoy.toyName}
                  className="h-52 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{alltoy.toyName}</h2>
                <p>{alltoy.subCategory}</p>
                <p>Price: ${alltoy.price}</p>
                <p className="flex">
                  Rating: <FaStar className="text-yellow-300" /> {alltoy.rating}
                </p>
                <div className="">
                  <Link to={`/ToyDetails/${alltoy.toyId}`}>
                    <button className="btn w-full btn-primary">
                      View More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default Alltoys;
