import { Box, Card, CardContent } from "@mui/material";
import video1 from "../../assets/aboutUs/1.mp4";
import video2 from "../../assets/aboutUs/2.mp4";
import video3 from "../../assets/aboutUs/3.mp4";
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

const AboutUs = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t] = useTranslation();
  /* -------------------------------------------------------------------------- */
  /*                                    Title                                   */
  /* -------------------------------------------------------------------------- */
  TabTitle(t("about"));

  return (
    <>
      <Preloader />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 0.8,
          y: 0,
          x: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        id="landing"
      >
        <Box
          sx={{
            width: {
              xs: "90%",
              md: "80%",
            },
            margin: "120px auto 0 ",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: {
                xs: "300px", // for small screens
                sm: "400px", // for small screens
                md: "500px", // for medium screens
                lg: "600px", // for large screens
              },
              borderRadius: "8px",
            }}
          >
            <video
              src={video1}
              autoPlay
              muted
              loop
              style={{ width: "100%", borderRadius: "8px" }}
            ></video>
          </Box>
        </Box>
      </motion.div>
      <Box
        sx={{
          width: "80%",
          direction: "ltr",
          margin: {
            xs: "100px auto 0",
            sm: "100px auto 0",
            md: "200px auto 0",
            lg: "400px auto 0",
          },
          display: {
            sm: "block",
            md: "flex",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "50%",
            },
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        >
          <video
            src={video2}
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0px 10px 140px #000",
            }}
          ></video>
        </Box>
        <Box sx={{ alignContent: "center" }}>
          <Card
            sx={{
              ...styles,
              width: {
                xs: "250px",
                sm: "400px",
                md: "350px",
                lg: "500px",
              },
              maxHeight: "100%",
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
            <CardContent>
              <span style={{ color: "#3fdb89", fontSize: "40px" }}>
                {t("aboutUs-span1")}
              </span>{" "}
              <span>{t("aboutUs-span2")}</span>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box
        sx={{
          width: "80%",
          direction: "rtl",
          margin: "200px auto 0",
          display: {
            sm: "block",
            md: "flex",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "50%",
            },
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        >
          <video
            src={video3}
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0px 10px 140px #000",
            }}
          ></video>
        </Box>
        <Box sx={{ alignContent: "center" }}>
          <Card
            sx={{
              ...styles,
              width: {
                xs: "250px",
                sm: "400px",
                md: "350px",
                lg: "500px",
              },
              maxHeight: "100%",
              direction: "rtl",
              alignContent: "center",
              margin: "10px auto",
              boxShadow: "0px 10px 140px #000",
              transform: {
                xs: "translateY(-30px)",
                sm: "translateY(-30px)",
                md: "translateX(30px)",
              },
            }}
          >
            <CardContent>
              <span style={{ color: "#3fdb89", fontSize: "40px" }}>
                {t("aboutUs-span3")}
              </span>{" "}
              <span>{t("aboutUs-span4")}</span>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <EndFooter />
    </>
  );
};

export default AboutUs;
