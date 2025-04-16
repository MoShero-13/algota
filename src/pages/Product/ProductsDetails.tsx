import { useParams } from "react-router-dom";
import ProdectDetails from "../../data/productDetails";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import Preloader from "../../components/Preloader";
import { TabTitle } from "../../components/Title";
import { motion } from "motion/react";
import EndFooter from "../Home/EndFooter";

const styles = {
  padding: "25px",
  fontSize: "20px",
  textAlign: "center",
  lineHeight: "1.5",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(8px)",
  color: "#fff",
  borderRadius: "14px",
};

const ProductsDetails = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();
  /* -------------------------------------------------------------------------- */
  /*                                 Fetch Data                                 */
  /* -------------------------------------------------------------------------- */
  let { id } = useParams();
  const product = ProdectDetails.find((product) => String(product.id) === id);

  /* -------------------------------------------------------------------------- */
  /*                                    Title                                   */
  /* -------------------------------------------------------------------------- */
  TabTitle(t("productTitle"));
  return (
    <>
      <Preloader />
      <div id="landing">
        <Box
          sx={{
            width: "80%",
            direction: "ltr",
            margin: "120px auto 0 auto",
            display: {
              sm: "block",
              md: "flex",
            },
          }}
        >
          <Box
            component="img"
            src={product?.insideImage}
            loading="lazy"
            alt="Slide"
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "50%",
              },
              height: {
                xs: "250px", // for small screens
                sm: "300px", // for small screens
                md: "350px", // for medium screens
                lg: "400px", // for large screens
              },
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0px 10px 140px #000",
            }}
          />
          <Box sx={{ alignContent: "center" }}>
            <Card
              key={product?.id}
              sx={{
                ...styles,
                width: {
                  xs: "250px",
                  sm: "400px",
                  md: "350px",
                  lg: "500px",
                },
                height: "50%",
                direction: "rtl",
                alignContent: "center",
                margin: "10px auto",
                boxShadow: "0px 10px 140px #000",
                transform: {
                  xs: "translateY(-30px)",
                  sm: "translateY(-30px)",
                  md: "translateX(-30px)",
                },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 0.8,
                  y: 0,
                  x: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                viewport={{ once: false, amount: 0.5 }}
                dir={t("dir")}
              >
                {i18n.language === "en" && (
                  <>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        style={{ color: "#3fdb89", height: "30%" }}
                      >
                        {product?.nameEn}
                      </Typography>
                    </CardContent>
                    <Typography
                      sx={{
                        alignContent: "center",
                        color: "#ddd",
                        height: "30%",
                        fontSize: "18px",
                      }}
                    >
                      {product?.descrption1En}
                    </Typography>
                  </>
                )}
                {i18n.language === "ar" && (
                  <>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        style={{ color: "#3fdb89", height: "30%" }}
                      >
                        {product?.name}
                      </Typography>
                    </CardContent>
                    <Typography
                      sx={{
                        alignContent: "center",
                        color: "#ddd",
                        height: "30%",
                        fontSize: "18px",
                      }}
                    >
                      {product?.descrption1}
                    </Typography>
                  </>
                )}
              </motion.div>
            </Card>
          </Box>
        </Box>
      </div>
      {(id === "2" ||
        id === "7" ||
        id === "9" ||
        id === "16" ||
        id === "18" ||
        id === "21") && (
        <Box sx={{ width: "80%", margin: "50px auto 0" }}>
          {i18n.language === "ar" && (
            <>
              <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                <motion.h2
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="h2-1"
                >
                  {product?.numberofsection.title1}
                </motion.h2>
              </Box>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 0.8,
                  y: 0,
                  x: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <Swiper
                  style={{ marginTop: "50px", borderRadius: "25px" }}
                  slidesPerView={1}
                  spaceBetween={25}
                  loop={true}
                  centeredSlides={true}
                  grabCursor={true}
                  breakpoints={{
                    560: {
                      slidesPerView: 2,
                      spaceBetween: 25,
                    },
                    1300: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                  }}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {product?.section1.map((our) => (
                    <SwiperSlide
                      style={{ height: "500px", maxWidth: "100%" }}
                      key={our.id}
                    >
                      <div className="new-card swiper-slide">
                        <div className="card-container">
                          <div className="top">
                            <img src={our.image} alt="" loading="lazy" />
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
                              باركود الطرد : <span> {our.parcelBarcode} </span>
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
            </>
          )}
          {i18n.language === "en" && (
            <>
              <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                <motion.h2
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="h2-1"
                >
                  {product?.numberofsectionEn.title1}
                </motion.h2>
              </Box>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 0.8,
                  y: 0,
                  x: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <Swiper
                  style={{ marginTop: "50px", borderRadius: "25px" }}
                  slidesPerView={1}
                  spaceBetween={25}
                  loop={true}
                  centeredSlides={true}
                  grabCursor={true}
                  breakpoints={{
                    560: {
                      slidesPerView: 2,
                      spaceBetween: 25,
                    },
                    1300: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                  }}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {product?.section1?.map((our) => (
                    <SwiperSlide
                      style={{ height: "500px", maxWidth: "100%" }}
                      key={our.id}
                    >
                      <div className="new-card swiper-slide">
                        <div className="card-container">
                          <div className="top">
                            <img src={our.image} alt="" loading="lazy" />
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
                              Name : <span> {our.nameEn} </span>
                            </h5>
                            <h5 className="card-name" dir="rtl">
                              Wieght : <span> {our.pieceWieght} </span>
                            </h5>
                            <h5 className="card-name" dir="rtl">
                              Number in the package : <span> {our.numOf} </span>
                            </h5>
                            <h5 className="card-name" dir="rtl">
                              Parcel barcode :{" "}
                              <span> {our.parcelBarcode} </span>
                            </h5>
                          </div>
                          <div className="about-card">
                            <h2>Details</h2>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            </>
          )}
        </Box>
      )}
      {(id === "4" ||
        id === "6" ||
        id === "8" ||
        id === "10" ||
        id === "12" ||
        id === "13" ||
        id === "14" ||
        id === "15" ||
        id === "17" ||
        id === "19") && (
        <>
          <Box sx={{ width: "80%", margin: "50px auto 0" }}>
            {i18n.language === "ar" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsection.title1}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section1.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
              </>
            )}
            {i18n.language === "en" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsectionEn.title1}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section1?.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
                                Name : <span> {our.nameEn} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Wieght : <span> {our.pieceWieght} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Number in the package :{" "}
                                <span> {our.numOf} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Parcel barcode :{" "}
                                <span> {our.parcelBarcode} </span>
                              </h5>
                            </div>
                            <div className="about-card">
                              <h2>Details</h2>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </>
            )}
          </Box>
          <Box sx={{ width: "80%", margin: "50px auto 0" }}>
            {i18n.language === "ar" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsection.title2}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section2?.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
              </>
            )}
            {i18n.language === "en" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsectionEn.title2}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section2?.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
                                Name : <span> {our.nameEn} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Wieght : <span> {our.pieceWieght} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Number in the package :{" "}
                                <span> {our.numOf} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Parcel barcode :{" "}
                                <span> {our.parcelBarcode} </span>
                              </h5>
                            </div>
                            <div className="about-card">
                              <h2>Details</h2>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </>
            )}
          </Box>
        </>
      )}
      {(id === "1" ||
        id === "3" ||
        id === "11" ||
        id === "20" ||
        id === "5") && (
        <>
          <Box sx={{ width: "80%", margin: "50px auto 0" }}>
            {i18n.language === "ar" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsection.title1}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section1.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
              </>
            )}
            {i18n.language === "en" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsectionEn.title1}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section1?.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
                                Name : <span> {our.nameEn} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Wieght : <span> {our.pieceWieght} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Number in the package :{" "}
                                <span> {our.numOf} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Parcel barcode :{" "}
                                <span> {our.parcelBarcode} </span>
                              </h5>
                            </div>
                            <div className="about-card">
                              <h2>Details</h2>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </>
            )}
          </Box>
          <Box sx={{ width: "80%", margin: "50px auto 0" }}>
            {i18n.language === "ar" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsection.title2}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section2?.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
              </>
            )}
            {i18n.language === "en" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsectionEn.title2}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section2?.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
                                Name : <span> {our.nameEn} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Wieght : <span> {our.pieceWieght} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Number in the package :{" "}
                                <span> {our.numOf} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Parcel barcode :{" "}
                                <span> {our.parcelBarcode} </span>
                              </h5>
                            </div>
                            <div className="about-card">
                              <h2>Details</h2>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </>
            )}
          </Box>
          <Box sx={{ width: "80%", margin: "50px auto 0" }}>
            {i18n.language === "ar" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsection.title3}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section3?.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
              </>
            )}
            {i18n.language === "en" && (
              <>
                <Box sx={{ width: "80%", margin: "0 0 0 auto" }}>
                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 0.8,
                      y: 0,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 },
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="h2-1"
                  >
                    {product?.numberofsectionEn.title3}
                  </motion.h2>
                </Box>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 0.8,
                    y: 0,
                    x: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Swiper
                    style={{ marginTop: "50px", borderRadius: "25px" }}
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    breakpoints={{
                      560: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                      },
                      1300: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                      },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {product?.section3?.map((our) => (
                      <SwiperSlide
                        style={{ height: "500px", maxWidth: "100%" }}
                        key={our.id}
                      >
                        <div className="new-card swiper-slide">
                          <div className="card-container">
                            <div className="top">
                              <img src={our.image} alt="" loading="lazy" />
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
                                Name : <span> {our.nameEn} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Wieght : <span> {our.pieceWieght} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Number in the package :{" "}
                                <span> {our.numOf} </span>
                              </h5>
                              <h5 className="card-name" dir="rtl">
                                Parcel barcode :{" "}
                                <span> {our.parcelBarcode} </span>
                              </h5>
                            </div>
                            <div className="about-card">
                              <h2>Details</h2>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </>
            )}
          </Box>
        </>
      )}
      <EndFooter />
    </>
  );
};

export default ProductsDetails;
