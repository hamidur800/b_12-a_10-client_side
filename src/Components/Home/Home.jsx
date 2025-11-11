import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaDollarSign, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch properties");
        setLoading(false);
      });
  }, []);

  {
    loading && <p className="text-center">Loading...</p>;
  }
  {
    error && <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-white">
      {/*    Slider Section */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop
        className="h-[400px] md:h-[550px] mb-10"
      >
        {[
          {
            title: "Find Your Dream Home",
            img: "https://i.ibb.co/W6V0r3L/home-banner1.jpg",
          },
          {
            title: "Luxury Villas & Apartments",
            img: "https://i.ibb.co/3zZbZcY/home-banner2.jpg",
          },
          {
            title: "Smart Living for Smart People",
            img: "https://i.ibb.co/GVXtLfK/home-banner3.jpg",
          },
        ].map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative w-full h-full bg-center bg-cover flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <h2 className="relative z-10 text-3xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg">
                {slide.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/*     Featured Properties */}
      <section className="w-11/12 mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-10">
          Featured Properties
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={property.image}
                alt={property.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {property.propertyName}
                </h3>
                <p className="text-gray-600 text-sm">
                  {property.shortDescription}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {property.location}
                  </span>
                  <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                    <FaDollarSign /> {property.price}
                  </span>
                </div>
                <Link
                  to={`/propertydetails/${property._id}`}
                  className="block w-full text-center py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*     Why Choose Us */}
      <section className="bg-indigo-100 py-16">
        <div className="w-11/12 mx-auto text-center space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
            Why Choose HomeNest?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At HomeNest, we believe finding your dream home should be simple,
            secure, and satisfying. That’s why we offer transparent listings,
            verified owners, and top-rated agents for a smooth experience.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Trusted Listings",
                desc: "All properties are verified by our team.",
              },
              {
                title: "Affordable Pricing",
                desc: "Compare thousands of listings easily.",
              },
              { title: "24/7 Support", desc: "We’re always here to help you." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <FaStar className="text-yellow-500 text-3xl mx-auto mb-3" />
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*     Extra Section 1 */}
      <section className="py-20 w-11/12 mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://i.ibb.co/N7dSpwr/real-estate-agent.jpg"
            alt="agent"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-indigo-600 mb-4">
              Expert Agents at Your Service
            </h2>
            <p className="text-gray-600 mb-4">
              Our certified agents help you every step of the way—from finding
              properties to closing the deal.
            </p>
            <Link
              to="/AllProperties"
              className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      {/*     Extra Section 2 */}
      <section className="bg-indigo-50 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-6">
          Join 10,000+ Happy Home Owners
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 mb-6">
          Start your journey today with HomeNest and make your property dreams a
          reality!
        </p>
        <Link
          to="/Signup"
          className="inline-block bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
