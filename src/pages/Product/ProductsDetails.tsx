import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { TabTitle } from "../../components/Title";
import useProducts from "../../hooks/useProducts";
import useCategories from "../../hooks/useCategories";
import useSubcategories from "../../hooks/useSubcategories";
import Preloader from "../../components/Preloader";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
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

const ProductsDetails = () => {
  const { id } = useParams();
  const { data: allProducts, loading: loadingProducts } = useProducts();
  const { data: allCategories, loading: loadingCategories } = useCategories();
  const { data: allSubcategories, loading: loadingSubcategories } =
    useSubcategories();
  const [t, i18n] = useTranslation();

  TabTitle(t("productTitle"));

  if (loadingProducts || loadingCategories || loadingSubcategories)
    return <Preloader />;

  const category = allCategories.find((cat) => cat.id === id);
  if (!category)
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }}>
        القسم غير موجود
      </Typography>
    );

  const relatedSubcategories = allSubcategories.filter(
    (sub) => sub.category_id === id
  );

  const productsInCategory = allProducts.filter((product) => {
    if (product.category_id === id) return true;
    if (
      product.subcategory_id &&
      relatedSubcategories.some((sub) => sub.id === product.subcategory_id)
    )
      return true;
    return false;
  });

  return (
    <>
      <Box sx={{ width: "80%", margin: "120px auto 50px auto" }}>
        {/* عرض بيانات القسم */}
        <Box
          sx={{
            width: "100%",
            direction: "ltr",
            margin: "120px auto 0 auto",
            display: {
              sm: "block",
              md: "flex",
            },
          }}
        >
          <Box
            component="img"
            src={category.inside_image}
            loading="lazy"
            alt="Slide"
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "50%",
              },
              height: {
                xs: "250px", // for small screens
                sm: "300px", // for small screens
                md: "350px", // for medium screens
                lg: "400px", // for large screens
              },
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0px 10px 140px #000",
            }}
          />
          <Box sx={{ alignContent: "center" }}>
            <Card
              key={category.id}
              sx={{
                ...styles,
                width: {
                  xs: "250px",
                  sm: "400px",
                  md: "350px",
                  lg: "500px",
                },
                height: "50%",
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
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 0.8,
                  y: 0,
                  x: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                viewport={{ once: false, amount: 0.5 }}
                dir={t("dir")}
              >
                {i18n.language === "en" && (
                  <>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        style={{ color: "#3fdb89", height: "30%" }}
                      >
                        {category.name_en}
                      </Typography>
                    </CardContent>
                    <Typography
                      sx={{
                        alignContent: "center",
                        color: "#ddd",
                        height: "30%",
                        fontSize: "18px",
                      }}
                    >
                      {category.description1_en}
                    </Typography>
                  </>
                )}
                {i18n.language === "ar" && (
                  <>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        style={{ color: "#3fdb89", height: "30%" }}
                      >
                        {category.name_ar}
                      </Typography>
                    </CardContent>
                    <Typography
                      sx={{
                        alignContent: "center",
                        color: "#ddd",
                        height: "30%",
                        fontSize: "18px",
                      }}
                    >
                      {category.description1_ar}
                    </Typography>
                  </>
                )}
              </motion.div>
            </Card>
          </Box>
        </Box>

        {/* عرض المنتجات بحسب كل قسم فرعي */}
        {relatedSubcategories.map((subcategory) => {
          const filteredProducts = productsInCategory.filter(
            (p) => p.subcategory_id === subcategory.id
          );
          if (filteredProducts.length === 0) return null;

          return (
            <Box key={subcategory.id} sx={{ mt: 8 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    i18n.language === "ar" ? "flex-start" : "flex-end", // يمين أو يسار حسب اللغة
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 1.2,
                    borderRadius: "8px",
                    backgroundColor: "#007236",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#007236",
                      // border: "1px solid #007236",
                    },
                  }}
                >
                  {i18n.language === "ar"
                    ? subcategory.name_ar
                    : subcategory.name_en}
                </Box>
              </Box>

              <Swiper
                style={{ borderRadius: "25px" }}
                slidesPerView={1}
                spaceBetween={25}
                loop={true}
                centeredSlides={true}
                grabCursor={true}
                breakpoints={{
                  560: { slidesPerView: 2 },
                  1300: { slidesPerView: 3 },
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {filteredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Box className="new-card swiper-slide">
                      <Box className="card-container">
                        <Box className="top">
                          <img
                            src={product.image}
                            alt={
                              i18n.language === "ar"
                                ? product.name_ar
                                : product.name_en
                            }
                            loading="lazy"
                          />
                        </Box>
                        <Box className="new-card-content">
                          <h2>
                            {i18n.language === "ar"
                              ? product.name_ar
                              : product.name_en}
                          </h2>
                        </Box>
                      </Box>
                      <Box className="inside">
                        <div className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                          >
                            <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                          </svg>
                        </div>
                        <Box className="item">
                          <h4
                            className="card-name"
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                            dir={i18n.language === "ar" ? "rtl" : "ltr"}
                          >
                            {i18n.language === "ar"
                              ? product.name_ar
                              : product.name_en}
                          </h4>

                          <h5
                            className="card-name"
                            dir={i18n.language === "ar" ? "rtl" : "ltr"}
                          >
                            {i18n.language === "ar" ? "وزن القطعة" : "Weight"} :{" "}
                            {product.pieceWeight}
                          </h5>

                          <h5
                            className="card-name"
                            dir={i18n.language === "ar" ? "rtl" : "ltr"}
                          >
                            {i18n.language === "ar"
                              ? "عدد القطع"
                              : "Pieces in Package"}{" "}
                            : {product.numOf}
                          </h5>

                          <h5
                            className="card-name"
                            dir={i18n.language === "ar" ? "rtl" : "ltr"}
                          >
                            {i18n.language === "ar"
                              ? "باركود الطرد"
                              : "Barcode"}{" "}
                            : {product.parcelBarcode}
                          </h5>
                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          );
        })}
      </Box>
      <EndFooter />
    </>
  );
};

export default ProductsDetails;
