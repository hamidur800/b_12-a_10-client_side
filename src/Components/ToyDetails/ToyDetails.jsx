import React, { useContext, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet";

const ToyDetails = () => {
  const { user } = useContext(AuthContext);
  const toys = useLoaderData();
  const { id } = useParams();
  const toy = toys.find((item) => item.toyId === parseInt(id));
  const toyT = Array.isArray(toys) ? toys.find((t) => t.id === id) : null;
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-infinity text-primary custom-loader"></span>

        <style>
          {`
      .custom-loader {
        width: 100px !important;
        height: 100px !important;
      }
    `}
        </style>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Success!",
      text: "Your 'Try Now' request has been submitted!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <Helmet>
        <title>
          {toyT ? `${toy.name} | ToyTopia` : "Toy Not Found | ToyTopia"}
        </title>
      </Helmet>

      {toyT ? (
        <>
          <p>Toy not found</p>
        </>
      ) : (
        <div className="max-w-4xl mx-auto my-10 bg-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={toy.pictureURL}
              alt={toy.toyName}
              className="w-72 rounded-lg shadow"
            />

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {toy.toyName}
              </h2>
              <span className="text-gray-600 mt-2">{toy.description}</span>

              <div className="mt-4 space-y-1 text-gray-700">
                <span>
                  <span>Price:</span> ${toy.price}
                </span>
                <p className="flex items-center gap-1">
                  Rating: <FaStar className="text-yellow-300" /> {toy.rating}
                </p>
                <span>
                  <span>Available:</span> {toy.availableQuantity}
                </span>
                <span>
                  <span>Category:</span> {toy.subCategory}
                </span>
                <span>
                  <span>Seller:</span> {toy.sellerName}
                </span>
                <span>
                  <span>Email:</span> {toy.sellerEmail}
                </span>
              </div>
            </div>
          </div>

          {/* Try Now Form */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Try Now</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />
              <button type="submit" className="btn btn-primary w-full">
                Try Now
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ToyDetails;
