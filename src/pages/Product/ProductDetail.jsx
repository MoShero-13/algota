import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { TabTitle } from "../../component/title";
import { useTranslation } from "react-i18next";
import ProdectDet from "../../data/ProductDet";
import Preloader from "../../component/Preloader";
import Navbar from "../Home/Navbar/Navbar";
import Headroom from "react-headroom";
import "./productdetails.css";

function ProductDetail() {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();

  TabTitle(t("productTitle"));
  let { id } = useParams();
  const product = ProdectDet.find((product) => String(product.id) === id);

  const top = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Preloader />
      <div className="headroom-container">
        <Headroom disableInlineStyles>
          <Navbar />
        </Headroom>
      </div>
      <div className="body-product" id="productDet">
        <section className="sec-01" dir="ltr" key={id}>
          <div className="container">
            <div className="content">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 20,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                viewport={{ once: false, amount: 0.5 }}
                className="image"
              >
                <img className=".food-img" src={product.image} alt="" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, y: 0 }}
                whileInView={{
                  opacity: 1,
                  x: -10,
                  y: -10,
                  transition: { delay: 0.2, duration: 1.5 },
                }}
                viewport={{ once: false, amount: 0.5 }}
                className="text-box"
              >
                {i18n.language === "ar" && (
                  <>
                    <h1>{product.name}</h1>
                    <p>{product.descrption1}</p>
                  </>
                )}
                {i18n.language === "en" && (
                  <>
                    <h1>{product.nameEn}</h1>
                    <p>{product.descrption1En}</p>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>
        {(id === "2") |
          (id === "7") |
          (id === "9") |
          (id === "16") |
          (id === "18") |
          (id === "21") && (
          <>
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
                key={id}
              >
                <h2 className="h2-1">{product.numberofsection.title1}</h2>
                <Swiper
                  style={{
                    width: "90%",
                    marginBottom: "30px",
                    borderRadius: "25px",
                  }}
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
                  {product.section1.map((our) => (
                    <SwiperSlide
                      style={{
                        height: "475px",
                        maxWidth: "100%",
                        marginBottom: "30px",
                      }}
                      key={our.id}
                      id={our.id}
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
                key={id}
              >
                <h2 className="h2-1">{product.numberofsectionEn.title1}</h2>
                <Swiper
                  style={{
                    width: "90%",
                    marginBottom: "30px",
                    borderRadius: "25px",
                  }}
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
                  {product.section1En.map((our) => (
                    <SwiperSlide
                      style={{
                        height: "475px",
                        maxWidth: "100%",
                        marginBottom: "30px",
                      }}
                      key={our.id}
                      id={our.id}
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
                src={require("../../assest/image/next.png")}
                alt=""
              />
              <img
                className="prevBtn"
                src={require("../../assest/image/prev.png")}
                alt=""
              />
            </motion.div>
          </>
        )}
        {(id === "1") |
          (id === "4") |
          (id === "6") |
          (id === "8") |
          (id === "10") |
          (id === "12") |
          (id === "13") |
          (id === "14") |
          (id === "15") |
          (id === "17") |
          (id === "19") && (
          <>
            {i18n.language === "ar" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="news-container"
                  key={id}
                >
                  <h2 className="h2-1">{product.numberofsection.title1}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                    {product.section1.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                                اسم المنتج : <span> {our.name} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                وزن القطعة : <span> {our.pieceWieght} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                عدد القطع في الطرد : <span> {our.numOf} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                باركود القطعة : <span> {our.itemBarcode} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                باركود الطرد :{" "}
                                <span> {our.parcelBarcode} </span>
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
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
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
                  <h2 className="h2-1">{product.numberofsection.title2}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                      nextEl: ".prevBtn2",
                      prevEl: ".nextBtn2",
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product.section2.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                                اسم المنتج : <span> {our.name} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                وزن القطعة : <span> {our.pieceWieght} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                عدد القطع في الطرد : <span> {our.numOf} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                باركود القطعة : <span> {our.itemBarcode} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                باركود الطرد :{" "}
                                <span> {our.parcelBarcode} </span>
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
                    className="nextBtn2"
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn2"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
              </>
            )}
            {i18n.language === "en" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="news-container"
                  key={id}
                >
                  <h2 className="h2-1">{product.numberofsectionEn.title1}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                    {product.section1En.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                              <h5 className="card-name" dir="ltr">
                                Name of Product : <span> {our.name} </span>
                              </h5>
                              <h5 className="card-name" dir="ltr">
                                ltr Product Weight :{" "}
                                <span> {our.pieceWieght} </span>
                              </h5>
                              <h5 className="card-name" dir="ltr">
                                Number of Product in Package:{" "}
                                <span> {our.numOf}</span>
                              </h5>
                              <h5 className="card-name" dir="ltr">
                                Product barcode:{" "}
                                <span> {our.itemBarcode} </span>
                              </h5>
                              <h5 className="card-name" dir="ltr">
                                Package barcode:{" "}
                                <span> {our.parcelBarcode}</span>
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
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
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
                  <h2 className="h2-1">{product.numberofsectionEn.title2}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                      nextEl: ".prevBtn2",
                      prevEl: ".nextBtn2",
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product.section2En.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                              <h5 className="card-name" dir="ltr">
                                Name of Product : <span> {our.name} </span>
                              </h5>
                              <h5 className="card-name" dir="ltr">
                                Product Weight :{" "}
                                <span> {our.pieceWieght} </span>
                              </h5>
                              <h5 className="card-name" dir="ltr">
                                Number of Product in Package:{" "}
                                <span> {our.numOf}</span>
                              </h5>
                              <h5 className="card-name" dir="ltr">
                                Product barcode:{" "}
                                <span> {our.itemBarcode} </span>
                              </h5>
                              <h5 className="card-name" dir="ltr">
                                Package barcode:{" "}
                                <span> {our.parcelBarcode}</span>
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
                    className="nextBtn2"
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn2"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
              </>
            )}
          </>
        )}
        {(id === "3") | (id === "11") | (id === "20") | (id === "5") && (
          <>
            {i18n.language === "ar" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="news-container"
                  key={id}
                >
                  <h2 className="h2-1">{product.numberofsection.title1}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                    {product.section1.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
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
                  <h2 className="h2-1">{product.numberofsection.title2}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                      nextEl: ".prevBtn2",
                      prevEl: ".nextBtn2",
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product.section2.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                    className="nextBtn2"
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn2"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
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
                  <h2 className="h2-1">{product.numberofsection.title3}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                      nextEl: ".prevBtn3",
                      prevEl: ".nextBtn3",
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product.section3.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                    className="nextBtn3"
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn3"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
              </>
            )}
            {i18n.language === "en" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="news-container"
                  key={id}
                >
                  <h2 className="h2-1">{product.numberofsectionEn.title1}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                    {product.section1En.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
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
                  <h2 className="h2-1">{product.numberofsectionEn.title2}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                      nextEl: ".prevBtn2",
                      prevEl: ".nextBtn2",
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product.section2En.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                    className="nextBtn2"
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn2"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
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
                  <h2 className="h2-1">{product.numberofsectionEn.title3}</h2>
                  <Swiper
                    style={{
                      width: "90%",
                      marginBottom: "30px",
                      borderRadius: "25px",
                    }}
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
                      nextEl: ".prevBtn3",
                      prevEl: ".nextBtn3",
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product.section3En.map((our) => (
                      <SwiperSlide
                        style={{
                          height: "475px",
                          maxWidth: "100%",
                          marginBottom: "30px",
                        }}
                        key={our.id}
                        id={our.id}
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
                    className="nextBtn3"
                    src={require("../../assest/image/next.png")}
                    alt=""
                  />
                  <img
                    className="prevBtn3"
                    src={require("../../assest/image/prev.png")}
                    alt=""
                  />
                </motion.div>
              </>
            )}
          </>
        )}
        <footer className="footer" dir={t("dir")}>
          <div className="footer-1">
            <Link
              to={"/algota/about#aboutUs"}
              style={{ width: "200px", color: "#333" }}
            >
              <span> {t("about")}</span>
            </Link>
            <span> {t("brochure")}</span>
          </div>
          <div className="footer-2">
            <a href="mailto:info@al-gota.net">
              <i className="fa fa-envelope"></i>
            </a>
            <a href="https://www.facebook.com/Algotafood/?locale=ar_AR">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/algotafoodcompany/">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@algotaco">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
          <div className="footer-3">
            <p className="span">{t("footer-span1")} &copy; 2024</p>
            <p className="span-2">
              {t("footer-span3")} :{" "}
              <a href="https://www.linkedin.com/in/bayan-al-dowir-7885812a2?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BphYYqCbeRxGq7dvpHeydxg%3D%3D">
                <span className="name-1">{t("footer-span4")}</span>
              </a>{" "}
              &
              <a href="https://www.linkedin.com/in/mohammad-shakhashiro-4ba0532a2?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Br3oAP5dPRj6HG5%2FUT1Jasw%3D%3D">
                <span className="name-1">{t("footer-span5")}</span>
              </a>
            </p>
          </div>
        </footer>
      </div>
      <div onClick={top} className="scrollToTop">
        <img src={require("../../assest/image/scrollToTop1.png")} alt="" />
      </div>
    </>
  );
}

export default ProductDetail;
