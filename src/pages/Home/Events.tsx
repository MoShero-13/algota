import { useTranslation } from "react-i18next";
import useEvents from "../../hooks/useEvents";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "motion/react";

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

const Events = () => {
  const { data } = useEvents();
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t] = useTranslation();

  return (
    <>
      <Box
        sx={{
          marginTop: "60px",
          textAlign: "center",
          fontSize: "20px",
          color: "#ddd",
          textShadow: "7px 8px 15px",
          opacity: "0.8",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          whileInView={{
            opacity: 0.8,
            x: 0,
            y: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          id="events"
        >
          {t("news-h2")}
        </motion.h1>
      </Box>
      <Box
        sx={{
          width: {
            xs: "90%",
            md: "80%",
          },
          margin: "60px auto 0",
          borderRadius: "8px",
        }}
      >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          style={{
            direction: "ltr",
            borderRadius: "8px",
          }}
        >
          {data.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  display: {
                    sm: "block",
                    md: "flex",
                  },
                }}
              >
                <Box
                  component="img"
                  src={slide.image}
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
                  }}
                />
                <Box sx={{ alignContent: "center" }}>
                  <Card
                    key={slide.id}
                    sx={{
                      ...styles,
                      width: {
                        xs: "250px",
                        sm: "400px",
                        md: "350px",
                        lg: "500px",
                      },
                      height: {
                        xs: "300px",
                        sm: "300px",
                        md: "250px",
                        lg: "250px",
                      },
                      direction: "rtl",
                      margin: "10px auto",
                      boxShadow: "none",
                      transform: {
                        xs: "translateY(-30px)",
                        sm: "translateY(-30px)",
                        md: "translateX(-30px)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ color: "#3fdb89", height: "30%" }}
                      >
                        {slide.exhibition}
                      </Typography>
                    </CardContent>
                    <Typography
                      sx={{
                        alignContent: "center",
                        color: "#ddd",
                        height: "30%",
                        fontSize: "16px",
                      }}
                    >
                      {t("place")} : {slide.place} | {t("date")} :{slide.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        alignContent: "center",
                        color: "#ddd",
                        height: "30%",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      {slide.content}
                    </Typography>
                  </Card>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default Events;
