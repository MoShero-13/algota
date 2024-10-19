import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "./ourEvent.css";

const News = ({ events }) => {
  const [t, i18n] = useTranslation();
  return (
    <>
      <div className="event-news" dir="rtl" id="news">
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          className="main-h1"
          id="product"
        >
          {t("news")}
        </motion.h1>
        <Swiper
          navigation={{
            enabled: true,
            nextEl: ".prevBtn1",
            prevEl: ".nextBtn1",
          }}
          modules={[Navigation]}
          className="mySwiper event-swiper"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              {i18n.language === "ar" && (
                <div className="event-container" dir="rtl">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="event-image"
                  >
                    <img src={event.image} alt="" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -50, y: 200 }}
                    whileInView={{
                      opacity: 1,
                      x: 30,
                      y: 200,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="event-content1"
                  >
                    <div className="header">
                      <h2> {event.exhibition}</h2>
                    </div>
                    <div className="info">
                      <p>المكان : {event.place}</p>
                      <p>التاريخ : {event.date}</p>
                    </div>
                    <div className="text-content">{event.content}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                      opacity: 1,
                      y: -20,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="event-content2"
                  >
                    <div className="header">
                      <h2>{event.exhibition}</h2>
                    </div>
                    <div className="info">
                      <p>المكان : {event.place}</p>
                      <p>التاريخ : {event.date}</p>
                    </div>
                    <div className="text-content">{event.content}</div>
                  </motion.div>
                </div>
              )}
              {i18n.language === "en" && (
                <div className="event-container" dir="ltr">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="event-image"
                  >
                    <img src={event.image} alt="" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50, y: 200 }}
                    whileInView={{
                      opacity: 1,
                      x: -30,
                      y: 200,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="event-content1"
                  >
                    <div className="header">
                      <h2> {event.exhibitionEn}</h2>
                    </div>
                    <div className="info">
                      <p>Place : {event.placeEn}</p>
                      <p>Date : {event.date}</p>
                    </div>
                    <div className="text-content">{event.contentEn}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                      opacity: 1,
                      y: -20,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="event-content2"
                  >
                    <div className="header">
                      <h2>{event.exhibitionEn}</h2>
                    </div>
                    <div className="info">
                      <p>Place : {event.placeEn}</p>
                      <p>Date : {event.date}</p>
                    </div>
                    <div className="text-content">{event.contentEn}</div>
                  </motion.div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          className="event-navigation"
        >
          <img
            className="nextBtn1"
            src={require("../../../assest/image/next.png")}
            alt=""
          />
          <img
            className="prevBtn1"
            src={require("../../../assest/image/prev.png")}
            alt=""
          />
        </motion.div>
      </div>
    </>
  );
};

export default News;
<SwiperSlide>
  <div className="event-container">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.2, duration: 0.5 },
      }}
      viewport={{ once: false, amount: 0.5 }}
      className="event-image"
    >
      <img src={require("../../../assest/image/news/1.jpeg")} alt="" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: -50, y: 200 }}
      whileInView={{
        opacity: 1,
        x: 30,
        y: 200,
        transition: { delay: 0.2, duration: 0.5 },
      }}
      viewport={{ once: false, amount: 0.5 }}
      className="event-content1"
    >
      <div className="header">
        <h2>معرض ( Gulfood ) أكبر معرض للأغذية في العالم</h2>
      </div>
      <div className="info">
        <p>المكان : الامارات - دبي</p>
        <p>التاريخ : 22-5-2023</p>
      </div>
      <div className="text-content">
        - من مشاركة شركة الغوطة الغذائية في معرض ( Gulfood ) لعام 2023
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: -20,
        transition: { delay: 0.2, duration: 0.5 },
      }}
      viewport={{ once: false, amount: 0.5 }}
      className="event-content2"
    >
      <div className="header">
        <h2>معرض ( Gulfood ) أكبر معرض للأغذية في العالم</h2>
      </div>
      <div className="info">
        <p>المكان : الامارات - دبي</p>
        <p>التاريخ : 22-5-2023</p>
      </div>
      <div className="text-content">
        - من مشاركة شركة الغوطة الغذائية في معرض ( Gulfood ) لعام 2023
      </div>
    </motion.div>
  </div>
</SwiperSlide>;
