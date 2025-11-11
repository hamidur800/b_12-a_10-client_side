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
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data);
        setLoading(false);
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProperties(sorted.slice(0, 6));
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
    <div className="min-h-screen ">
      {/*    Slider Section */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop
        className="h-[400px] md:h-[550px] w-10/12 mb-10"
      >
        {[
          {
            title: "Find Your Dream Home",
            img: "https://i.ibb.co/84tCGKM2/fainal2.jpg",
          },
          {
            title: "Luxury Villas & Apartments",
            img: "https://i.ibb.co/qLqBYKG9/fainal3.jpg",
          },
          {
            title: "Smart Living for Smart People",
            img: "https://i.ibb.co/6c1b7J0h/download-4.jpg",
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
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
                  to={`/PropertyDetails/${property._id}`}
                  className="block w-full text-center py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="min-h-screen">
        {/* Featured Properties */}
        <section className="max-w-7xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Properties
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <div
                key={prop._id}
                className="bg-white rounded-xl flex flex-col shadow-md hover:shadow-xl transition-all duration-200"
              >
                <img
                  src={prop.image || "/placeholder.jpg"}
                  alt={prop.title}
                  className="h-48 w-full object-cover rounded-t-xl"
                />
                <div className="flex flex-col justify-between flex-grow p-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{prop.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {prop.location}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-lg font-bold text-rose-500">
                      ${prop.price}
                    </p>
                    <Link variant="outline" size="sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className=" py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Verified Listings",
                  desc: "All properties are carefully verified before publishing.",
                },
                {
                  title: "Trusted Agents",
                  desc: "Work with professional and experienced real estate agents.",
                },
                {
                  title: "Best Locations",
                  desc: "We list only top-rated and well-connected neighborhoods.",
                },
                {
                  title: "Secure Transactions",
                  desc: "Safe payments and transparent documentation process.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="text-black text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className=" py-16">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">Happy Clients</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rahim Khan",
                  quote:
                    "Found my dream flat within a week. Highly recommended!",
                },
                {
                  name: "Sara Ahmed",
                  quote: "Agents were professional and listings were genuine.",
                },
                {
                  name: "Nayeem Hossain",
                  quote: "Smooth process from start to finish.",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="p-6 bg-white text-center shadow-lg rounded-2xl"
                >
                  <p className="italic text-gray-700 mb-3">“{t.quote}”</p>
                  <h4 className="font-semibold text-rose-500">{t.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*Latest Blogs */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">
              Real Estate Tips
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((b) => (
                <div
                  key={b}
                  className="p-6 border rounded-2xl hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    How to Find the Right Property #{b}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Quick guide to evaluate property listings effectively.
                  </p>
                  <Link size="sm" variant="outline">
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
