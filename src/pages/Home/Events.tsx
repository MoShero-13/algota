import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import useEvents from "../../hooks/useEvents";
import { useTranslation } from "react-i18next";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import theme from "../../theme/theme";
import { motion } from "motion/react";

const StyledPaper = styled(Paper)(() => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(8px)",
  padding: "2rem",
  borderRadius: "14px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ImageContainer = styled(Box)({
  position: "relative",
  height: "100%",
  minHeight: "400px",
  overflow: "hidden",
  borderRadius: "14px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  "&:hover img": {
    transform: "scale(1.05)",
  },
});

const GradientOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const Events = () => {
  /* -------------------------------------------------------------------------- */
  /*                                  useEvents                                 */
  /* -------------------------------------------------------------------------- */
  const { data } = useEvents();
  /* -------------------------------------------------------------------------- */
  /*                               useTranslation                               */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();

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
      <Box sx={{ width: { md: "80%" }, margin: "auto" }}>
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
              <div dir={t("dir")}>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                  <Grid
                    key={slide.id}
                    container
                    spacing={4}
                    alignItems="stretch"
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sx={{
                        transform: {
                          md:
                            i18n.language === "ar"
                              ? "translateX(-45px)  translateY(25px)"
                              : "translateX(45px) translateY(25px)",
                        },
                        transition: "transform 0.3s ease",
                        zIndex: "10",
                      }}
                    >
                      <StyledPaper elevation={3}>
                        <Typography
                          component="h1"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            color: "#3fdb89",
                            fontSize: { xs: "24px", md: "28px" },
                          }}
                        >
                          {i18n.language === "ar"
                            ? slide.exhibition
                            : slide.exhibitionEn}
                        </Typography>

                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <FaCalendarAlt
                            size={20}
                            style={{ margin: "0 8px", color: "#EC1F27" }}
                          />
                          <Typography variant="h6" sx={{ color: "#fff" }}>
                            {" "}
                            {slide.date}
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 3 }}
                        >
                          <FaMapMarkerAlt
                            size={20}
                            style={{ margin: "0 8px", color: "#EC1F27" }}
                          />
                          <Typography variant="h6" sx={{ color: "#fff" }}>
                            {" "}
                            {i18n.language === "ar"
                              ? slide.place
                              : slide.placeEn}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body1"
                          sx={{
                            maxWidth: "380px",
                            mb: 4,
                            lineHeight: 1.8,
                            color: "#fff",
                          }}
                        >
                          {i18n.language === "ar"
                            ? slide.content
                            : slide.contentEn}
                        </Typography>
                      </StyledPaper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <ImageContainer
                        sx={{
                          [theme.breakpoints.down("sm")]: {
                            transform: "translateY(-70px)",
                          },
                        }}
                      >
                        <img
                          src={slide.image}
                          alt="Tech Innovation Summit"
                          loading="lazy"
                        />
                        <GradientOverlay />
                      </ImageContainer>
                    </Grid>
                  </Grid>
                </Container>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default Events;
