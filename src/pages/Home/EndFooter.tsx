import { useTranslation } from "react-i18next";
import { HashLink as Link } from "react-router-hash-link";

function EndFooter() {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t] = useTranslation();
  return (
    <footer
      className="footer-about2"
      dir={t("dir")}
      style={{ marginTop: "40px" }}
    >
      <div className="footer-1">
        <Link to="/aboutUs#landing">
          <span> {t("about")}</span>
        </Link>
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
          <a href="https://bayanaldowir.carrd.co">
            <span className="name-1">{t("footer-span4")}</span>
          </a>{" "}
          &
          <a href="https://mohammadsh.carrd.co">
            <span className="name-1">{t("footer-span5")}</span>
          </a>
        </p>
      </div>
    </footer>
  );
}

export default EndFooter;
