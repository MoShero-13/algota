import React, { useEffect } from "react";
import { preLoaderAnim } from "../animation";
import { useTranslation } from "react-i18next";
import "./Preloader.css";

const Preloader = (url) => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();

  useEffect(() => {
    preLoaderAnim();
  }, [url]);

  return (
    <div className="preloader" dir="ltr" style={{ zIndex: "1000" }}>
      <div className="pre">
        {i18n.language === "ar" && (
          <img src={require("../assest/image/logo.png")} alt="" />
        )}
        {i18n.language === "en" && (
          <img src={require("../assest/image/logo1.png")} alt="" />
        )}
        <div className="loader">
          <div className="loader-1 bar"></div>
          <div className="loader-2 bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
