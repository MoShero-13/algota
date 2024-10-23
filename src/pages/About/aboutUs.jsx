import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TabTitle } from "../../component/title";
import Preloader from "../../component/Preloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./aboutUs.css";

const AboutUs = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();
  /* -------------------------------------------------------------------------- */
  /*                                   Contact                                  */
  /* -------------------------------------------------------------------------- */
  const [setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "d9c51755-d940-4805-91a1-da1bb3659d81");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success && i18n.language === "en") {
      Swal.fire({
        title: "Done!",
        text: "Your message has been sended",
        icon: "success",
      });
      // setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      // setResult(data.message);
    }
    if (data.success && i18n.language === "ar") {
      Swal.fire({
        title: "تم الإرسال",
        text: "لقد تم إرسال رسالتك بنجاح",
        icon: "success",
      });
      // setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      // setResult(data.message);
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                    Title                                   */
  /* -------------------------------------------------------------------------- */
  TabTitle(t("about"));
  return (
    <>
      <Preloader />
      <div className="about-container" id="aboutUs">
        <div className="about-nav" dir={t("dir")}>
          <Link to={`/algota/`}> {t("homepage")}</Link>
          <Link to={`/algota/#product`}> {t("products")}</Link>
          {i18n.language === "ar" && (
            <span
              onClick={() => {
                i18n.changeLanguage("en");
              }}
              className="language-a"
            >
              En
            </span>
          )}
          {i18n.language === "en" && (
            <span
              onClick={() => {
                i18n.changeLanguage("ar");
              }}
              className="language-a"
            >
              Ar
            </span>
          )}
        </div>
        <div className="about-landing" dir={t("dir")}>
          <video
            src={require("../../assest/image/about/1.mp4")}
            autoPlay
            muted
            loop
          ></video>
          <div
            className="text"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          >
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { delay: 2, duration: 0.5 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              className="text1"
            >
              {t("title")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { delay: 2.5, duration: 0.5 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              className="text2"
            >
              {t("title2")}
            </motion.p>
          </div>
          <div className="about-overlay"></div>
          <div className="about-logo">
            {i18n.language === "ar" && (
              <Link to={"/algota/#"}>
                <img src={require("../../assest/image/logo.png")} alt="" />
              </Link>
            )}
            {i18n.language === "en" && (
              <Link to={"/algota/#"}>
                <img src={require("../../assest/image/logo1.png")} alt="" />
              </Link>
            )}
          </div>
        </div>
        <div className="about-content">
          <section className="about-sec-01" dir="ltr">
            <div className="container">
              <div className="about-content">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: 15,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="image"
                >
                  <video
                    className=".food-img"
                    src={require("../../assest/image/about/2.mp4")}
                    alt=""
                    loop
                    muted
                    autoPlay
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{
                    opacity: 1,
                    y: 50,
                    transition: { delay: 0.2, duration: 1.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="about-text-box"
                  dir={t("dir")}
                >
                  <span style={{ fontSize: "2.5em", color: "#3fdb89" }}>
                    {t("aboutUs-span1")}{" "}
                  </span>
                  <span style={{ fontSize: "20px" }}>{t("aboutUs-span2")}</span>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
        <div className="about-content">
          <section className="about-sec-01" dir="rtl">
            <div className="container">
              <div className="about-content">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: -15,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="image"
                >
                  <video
                    className=".food-img"
                    src={require("../../assest/image/about/3.mp4")}
                    alt=""
                    loop
                    muted
                    autoPlay
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{
                    opacity: 1,
                    y: 50,
                    transition: { delay: 0.2, duration: 1.5 },
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="about-text-box"
                  dir={t("dir")}
                >
                  <span style={{ fontSize: "2.5em", color: "#3fdb89" }}>
                    {t("aboutUs-span3")}{" "}
                  </span>
                  <span style={{ fontSize: "20px" }}>{t("aboutUs-span4")}</span>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          whileInView={{
            opacity: 0.7,
            x: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          className="about-footer-h1 footer-h1"
        >
          {t("contact")}
        </motion.h1>
        <div className="footer-container" dir={t("dir")}>
          <div className="footer-contact footer-about">
            <form onSubmit={onSubmit} dir={t("dir")}>
              <h2> {t("forContact")}</h2>
              <div className="input-box">
                <FontAwesomeIcon icon={faUser} size="lg"></FontAwesomeIcon>
                <div className="input-content">
                  <input
                    type="text"
                    placeholder={t("input-1")}
                    name="name"
                    required
                  />
                  <div className="underline"></div>
                </div>
              </div>
              <div className="input-box">
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                <div className="input-content">
                  <input
                    type="email"
                    placeholder={t("input-2")}
                    name="email"
                    autoComplete="test"
                    required
                  />
                  <div className="underline"></div>
                </div>
              </div>
              <div className=" input-textarea">
                <textarea
                  name="message"
                  id=""
                  className=" "
                  placeholder={t("input-3")}
                ></textarea>
              </div>
              <button type="submit">{t("submit")}</button>
              <a href="mailto:info@al-gota.net">
                <p>info@al-gota.net</p>
              </a>
              <p>
                {t("phone")} :{" "}
                <a href="tel:+963944218493" dir="ltr">
                  +963-944218493
                </a>
              </p>
            </form>
          </div>
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22372.019598036248!2d36.36457583581547!3d33.53724832487041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e5e28af3dd6f%3A0x295ff83ddb3745c9!2z2LTYsdmD2Kkg2KfZhNi62YjYt9ipINmE2YTZhdmG2KrYrNin2Kog2KfZhNi62LDYp9im2YrYqQ!5e0!3m2!1sen!2s!4v1728819374729!5m2!1sen!2s"
              width="600"
              height="450"
              style={{}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="iframe"
            ></iframe>
          </div>
        </div>
        <footer className="footer-about2" dir={t("dir")}>
          <div className="footer-1">
            <Link to={"/algota/about#aboutUs"} style={{ width: "200px" }}>
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
    </>
  );
};

export default AboutUs;
