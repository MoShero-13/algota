import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "./ourFooter.css";

const Footer = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   Contact                                  */
  /* -------------------------------------------------------------------------- */
  const [setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "d9c51755-d940-4805-91a1-da1bb3659d81");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        title: "Done!",
        text: "Your message has been sended",
        icon: "success",
      });
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t] = useTranslation();
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 0.7,
          x: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        className="footer-h1"
        id="contact"
      >
        {t("contact")}
      </motion.h1>
      <div className="footer-container" dir={t("dir")}>
        <div className="footer-contact">
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
      <footer dir={t("dir")}>
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
    </>
  );
};

export default Footer;
