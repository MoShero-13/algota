import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import oldMan from "../../assets/oldMan.webp";
import { motion } from "motion/react";

const AboutUs = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t] = useTranslation();

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

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 0.8,
          x: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        style={{
          marginTop: "120px",
          textAlign: "center",
          fontSize: "50px",
          color: "#ddd",
          textShadow: "7px 8px 15px",
          opacity: "0.8",
        }}
        id="about"
      >
        {t("about")}
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        style={{
          color: "#ddd",
          fontSize: "25px",
          textAlign: "center",
          width: "90%",
          margin: "auto",
        }}
        dir={t("dir")}
      >
        {t("about-span")}
      </motion.h3>
      <Box
        sx={{
          display: "flex",
          width: "90%",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "50%",
            },
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              ...styles,
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "block",
              },
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.5 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              style={{ margin: "0" }}
              dir={t("dir")}
            >
              {t("about-p1")}
            </motion.p>
          </Box>
          <Box
            sx={{
              ...styles,
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "none",
              },
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.5 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              style={{ margin: "0" }}
              dir={t("dir")}
            >
              {t("about-p2")}
            </motion.p>
          </Box>
          <Box
            sx={{
              ...styles,
              display: {
                xs: "block",
                md: "none",
                lg: "none",
              },
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.5 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              style={{ margin: "0" }}
              dir={t("dir")}
            >
              {t("about-p3")}
            </motion.p>
          </Box>
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "none",
              lg: "block",
            },
            width: "50%",
          }}
        >
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.2, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.5 }}
            src={oldMan}
            alt="oldMan"
            style={{ width: "80%", margin: "0 10%" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default AboutUs;
