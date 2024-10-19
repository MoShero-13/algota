import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./about.css";

const About = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */

  const [t] = useTranslation();
  return (
    <div className="about" id="about">
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        className="main-h1"
      >
        {t("about")}
      </motion.h1>
      <div className="para-about">
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          dir={t("dir")}
        >
          {t("about-span")}
        </motion.span>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          className="p1"
          dir={t("dir")}
        >
          {t("about-p1")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          className="p2"
          dir={t("dir")}
        >
          {t("about-p2")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          className="p3"
          dir={t("dir")}
        >
          {t("about-p3")}
        </motion.p>
      </div>
      <img
        className="back-image"
        src={require("../../../assest/image/about/تلة.png")}
        alt=""
      />
      <motion.img
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 0.9,
          y: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        className="front-image"
        src={require("../../../assest/image/about/الختيار 2.png")}
        alt=""
      />
    </div>
  );
};

export default About;
