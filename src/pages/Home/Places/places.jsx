import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./places.css";

const Places = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t] = useTranslation();
  return (
    <div className="places" id="places">
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
        {t("places")}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        className="map5"
      >
        <div className="zoom">
          <img src={require("../../../assest/image/112.png")} alt="" />
          <img
            src={require("../../../assest/image/112.png")}
            id="imgZoom"
            alt=""
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Places;
