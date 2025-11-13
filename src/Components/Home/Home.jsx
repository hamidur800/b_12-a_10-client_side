import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);

  // Fetch properties
  useEffect(() => {
    fetch("https://b-12-a-10-server-side.vercel.app/properties")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Expected array but got:", data);
          setError("Invalid response from server");
          setLoading(false);
          return;
        }

        setFeatured(data);
        setLoading(false);

        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProperties(sorted.slice(0, 6));
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  return (
    <div className="min-h-screen">
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

      {/*  Featured Properties */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Properties
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="flex flex-col rounded-xl shadow-xl hover:shadow-xl hover:shadow-gradient transition-all border  duration-200"
            >
              <img
                src={prop.image || "/placeholder.jpg"}
                alt={prop.propertyName}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="flex flex-col justify-between flex-grow p-4">
                <div className="flex justify-between items-center">
                  <div className="">
                    <h3 className="text-xl font-semibold mb-1">
                      {prop.propertyName}
                    </h3>
                    <p className=" text-sm mb-2">{prop.location}</p>
                  </div>
                  <div className="">
                    <p className="italic text-sm">
                      Category :{prop.category || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-lg font-bold text-rose-500">
                    ${prop.price}
                  </p>

                  <Link
                    to={`/property/${prop._id}`}
                    className="button"
                    style={{ "--clr": "#7808d0" }}
                  >
                    <span className="button__icon-wrapper">
                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg"
                        width="10"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        />
                      </svg>

                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        width="10"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg button__icon-svg--copy"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    View Details
                  </Link>
                </div>
                <p className=" italic text-sm">
                  Posted by : {prop.userName || "Unknown"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  Why Choose Us */}
      <section className=" py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
          <div className="grid w-10/12 mx-auto sm:grid-cols-2 md:grid-cols-4 gap-8 lg:w-11/12">
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
                className="p-6 shadow-xl hover:shadow-xl hover:shadow-gradient transition-all border  duration-200 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Happy Clients</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 w-10/12 mx-auto">
            {[
              {
                name: "Rahim Khan",
                quote: "Found my dream flat within a week. Highly recommended!",
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
                className="shadow-xl hover:shadow-xl hover:shadow-gradient transition-all border  duration-200  p-6 text-center rounded-2xl"
              >
                <p className="italic text-gray-400 mb-3">“{t.quote}”</p>
                <h4 className="font-semibold text-rose-500">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  Latest Blogs */}
      <section className=" py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Real Estate Tips
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 w-10/12 mx-auto">
            {[1, 2, 3].map((b) => (
              <div
                key={b}
                className="p-6 rounded-2xl shadow-xl hover:shadow-xl hover:shadow-gradient transition-all border  duration-200"
              >
                <h3 className="text-xl font-semibold mb-2">
                  How to Find the Right Property #{b}
                </h3>
                <p className="text-gray-400 mb-3">
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
  );
}
