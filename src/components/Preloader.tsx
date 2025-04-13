import React, { useEffect } from "react";
import { preLoaderAnim } from "../animation";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.webp";
import logo1 from "../assets/logo1.webp";

const Preloader: React.FC = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();

  useEffect(() => {
    preLoaderAnim();
  }, []);

  return (
    <div className="preloader" id={t("")} dir="ltr" style={{ zIndex: "2222" }}>
      <div className="pre">
        {i18n.language === "ar" && <img src={logo} alt="" />}
        {i18n.language === "en" && <img src={logo1} alt="" />}
        <div className="loader">
          <div className="loader-1 bar"></div>
          <div className="loader-2 bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
