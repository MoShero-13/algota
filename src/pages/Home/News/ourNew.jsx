import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Navigation } from "swiper/modules";
import "./news.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const OurNews = ({ ours }) => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();
  return (
    <div className="news" id="our-news" dir="rtl">
      <img src="/image/about/تلة.png" alt="" className="back-image1" />
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 0.7,
          x: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        className="main-h1"
      >
        {t("ournews")}
      </motion.h1>
      {i18n.language === "ar" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          className="news-container"
        >
          <Swiper
            style={{ width: "90%", marginBottom: "30px", borderRadius: "25px" }}
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            centeredSlides={true}
            fadeEffect={true}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              868: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1300: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
            }}
            navigation={{
              enabled: true,
              nextEl: ".prevBtn",
              prevEl: ".nextBtn",
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {ours.map((our) => (
              <SwiperSlide
                style={{ height: "500px", maxWidth: "100%" }}
                key={our.id}
              >
                <div className="new-card swiper-slide">
                  <div className="card-container">
                    <div className="top">
                      <img src={our.image} alt="" />
                    </div>
                    <div className="new-card-content">
                      <h2>{our.name}</h2>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                      </svg>
                    </div>
                    <div className="item">
                      <h5 className="card-name" dir="rtl">
                        وزن القطعة : <span> 250g </span>
                      </h5>
                      <h5 className="card-name" dir="rtl">
                        عدد القطع في الطرد : <span> 24 </span>
                      </h5>
                      <h5 className="card-name" dir="rtl">
                        وزن الطرد : <span> 7.50kg </span>
                      </h5>
                      <h5 className="card-name" dir="rtl">
                        حجم الطرد : <span> 0.0251m3 </span>
                      </h5>
                      <h5 className="card-name" dir="rtl">
                        باركود الطرد : <span> 26577615 </span>
                      </h5>
                    </div>
                    <div className="about-card">
                      <h2>معلومات المنتج</h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
      {i18n.language === "en" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          className="news-container"
        >
          <Swiper
            style={{ width: "90%", marginBottom: "30px", borderRadius: "25px" }}
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            centeredSlides={true}
            fadeEffect={true}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              868: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1300: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
            }}
            navigation={{
              enabled: true,
              nextEl: ".prevBtn",
              prevEl: ".nextBtn",
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {ours.map((our) => (
              <SwiperSlide
                style={{ height: "500px", maxWidth: "100%" }}
                key={our.id}
              >
                <div className="new-card swiper-slide">
                  <div className="card-container">
                    <div className="top">
                      <img src={our.image} alt="" />
                    </div>
                    <div className="new-card-content">
                      <h2>{our.nameEn}</h2>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                      </svg>
                    </div>
                    <div className="item">
                      <h5 className="card-name" dir="rtl">
                        وزن القطعة : <span> 250g </span>
                      </h5>
                      <h5 className="card-name" dir="rtl">
                        عدد القطع في الطرد : <span> 24 </span>
                      </h5>
                      <h5 className="card-name" dir="rtl">
                        وزن الطرد : <span> 7.50kg </span>
                      </h5>
                      <h5 className="card-name" dir="rtl">
                        حجم الطرد : <span> 0.0251m3 </span>
                      </h5>
                      <h5 className="card-name" dir="rtl">
                        باركود الطرد : <span> 26577615 </span>
                      </h5>
                    </div>
                    <div className="about-card">
                      <h2>معلومات المنتج</h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        className="navigation"
      >
        <img
          className="nextBtn"
          src={require("../../../assest/image/next.png")}
          alt=""
        />
        <img
          className="prevBtn"
          src={require("../../../assest/image/prev.png")}
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default OurNews;
