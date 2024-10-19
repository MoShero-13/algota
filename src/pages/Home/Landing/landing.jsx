import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./landing.css";

const Landing = ({ slides }) => {
  return (
    <>
      <div className="landing">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.image}>
              <img src={slide.image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Landing;
