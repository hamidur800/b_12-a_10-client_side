// src/Components/Slider/Slider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  const images = [
    "https://imgsvr2.904happyhour.com/article-images/5f8ae902945d5_WlPPtJzJbeKxEn2lQCJIn3vmy.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtN7j5uP6te9_pGbh-xVsj5VcUKOPhzIO-gA&s",
    "https://m.media-amazon.com/images/I/51GLWBFfMpL.jpg",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              loading="lazy"
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-80 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
