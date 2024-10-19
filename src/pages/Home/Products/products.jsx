import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ProdectDet from "../../../data/ProductDet";
import "./products.css";

const Products = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();

  const productItems = ProdectDet.map((store) => {
    const { id, name, descrption, nameEn, descrptionEn, image } = store;
    if (i18n.language === "ar") {
      return (
        <Link to={`product/${id}/#productDet`} key={id}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.5 }}
            className="box"
          >
            <img src={image} alt="" />
            <div className="content" dir="rtl">
              <h3>{name}</h3>
              <p>{descrption}</p>
            </div>
            <div className="info" dir="rtl">
              {t("more")}
              <i className="fas fa-long-arrow-alt-left"></i>
            </div>
          </motion.div>
        </Link>
      );
    }
    if (i18n.language === "en") {
      return (
        <Link to={`product/${id}/#productDet`} key={id}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.5 }}
            className="box"
          >
            <img src={image} alt="" />
            <div className="content" dir="ltr">
              <h3>{nameEn}</h3>
              <p>{descrptionEn}</p>
            </div>
            <div className="info" dir="ltr">
              {t("more")}
              <i className="fas fa-long-arrow-alt-right"></i>
            </div>
          </motion.div>
        </Link>
      );
    }
  });

  return (
    <>
      <div className="product" dir="rtl">
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          viewport={{ once: false, amount: 0.5 }}
          className="main-h1"
          id="product"
        >
          {t("products")}
        </motion.h1>
        <div className="articles" id="articles">
          <div className="container">{productItems}</div>
        </div>
      </div>
    </>
  );
};

export default Products;
