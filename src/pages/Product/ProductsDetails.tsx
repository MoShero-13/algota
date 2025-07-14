import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
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

const styles = {
  background: "#111",
  borderRadius: "10px",
  padding: "20px",
  color: "#ddd",
};

const packingLabels: Record<string, { ar: string; en: string }> = {
  tomato_paste: { ar: "معجون الطماطم", en: "Tomato Paste" },
  ketchup: { ar: "الكتشب", en: "Ketchup" },
  iraqi_pickles: { ar: "المخللات العراقية", en: "Iraqi Pickles" },
  syrian_pickles: { ar: "المخللات السورية", en: "Syrian Pickles" },
  date_molasses: { ar: "دبس التمر", en: "Date Molasses" },
  grape_molasses: { ar: "دبس العنب", en: "Grape Molasses" },
  pomegranate_molasses: { ar: "دبس الرمان", en: "Pomegranate Molasses" },
  drying: { ar: "المجففات", en: "Drying" },
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

  // إيجاد القسم الرئيسي
  const category = allCategories.find((cat) => cat.id === id);
  if (!category)
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }}>
        القسم غير موجود
      </Typography>
    );

  // جلب الأقسام الفرعية التابعة للقسم الحالي
  const relatedSubcategories = allSubcategories.filter(
    (sub) => sub.category_id === id
  );

  // جلب المنتجات التي تنتمي للقسم أو أي من الأقسام الفرعية التابعة له
  const productsInCategory = allProducts.filter((product) => {
    // المنتج ينتمي مباشرة للقسم
    if (product.category_id === id) return true;
    // أو ينتمي لقسم فرعي تابع لهذا القسم
    if (
      product.subcategory_id &&
      relatedSubcategories.some((sub) => sub.id === product.subcategory_id)
    )
      return true;
    return false;
  });

  // تجميع أنواع التعبئة (packing_type) الموجودة في المنتجات لعرضها فقط
  const uniquePackingTypes = Array.from(
    new Set(productsInCategory.map((p) => p.packing_type))
  );

  // دالة ترجمة اسم التعبئة حسب اللغة
  const getPackingLabel = (type: string) => {
    const label = packingLabels[type];
    return label ? (i18n.language === "ar" ? label.ar : label.en) : type;
  };

  return (
    <Box sx={{ width: "80%", margin: "120px auto 50px auto" }}>
      {/* عرض بيانات القسم */}
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          gap: 4,
          alignItems: "center",
          mb: 5,
        }}
      >
        <Box
          component="img"
          src={category.image}
          loading="lazy"
          alt={i18n.language === "ar" ? category.name_ar : category.name_en}
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "250px", sm: "300px", md: "350px", lg: "400px" },
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0px 10px 140px #000",
          }}
        />

        <Box>
          <Card
            sx={{
              ...styles,
              width: { xs: "250px", sm: "400px", md: "350px", lg: "500px" },
              direction: i18n.language === "ar" ? "rtl" : "ltr",
              margin: "10px auto",
              boxShadow: "0px 10px 140px #000",
              padding: 2,
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
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ color: "#3fdb89", height: "30%" }}
                >
                  {i18n.language === "ar" ? category.name_ar : category.name_en}
                </Typography>
              </CardContent>
              <Typography
                sx={{
                  color: "#ddd",
                  fontSize: "18px",
                  lineHeight: 1.6,
                  textAlign: i18n.language === "ar" ? "right" : "left",
                }}
              >
                {i18n.language === "ar"
                  ? category.description1_ar
                  : category.description1_en}
              </Typography>
            </motion.div>
          </Card>
        </Box>
      </Box>

      {/* عرض الأقسام الفرعية التابعة */}
      {relatedSubcategories.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ color: "#3fdb89", mb: 2 }}>
            {i18n.language === "ar" ? "الأقسام الفرعية" : "Subcategories"}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {relatedSubcategories.map((sub) => (
              <Button
                key={sub.id}
                variant="outlined"
                href={`/subcategory/${sub.id}`}
                sx={{ textTransform: "none" }}
              >
                {i18n.language === "ar" ? sub.name_ar : sub.name_en}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      {/* عرض المنتجات مصنفة حسب نوع التعبئة */}
      {uniquePackingTypes.map((packingType) => {
        const filteredProducts = productsInCategory.filter(
          (p) => p.packing_type === packingType
        );
        if (filteredProducts.length === 0) return null;

        return (
          <Box key={packingType} sx={{ mt: 8 }}>
            <Typography
              variant="h5"
              sx={{ mb: 2, color: "#fff", textAlign: "start" }}
            >
              {getPackingLabel(packingType)}
            </Typography>

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
                      <Box className="item">
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
                          {i18n.language === "ar" ? "باركود الطرد" : "Barcode"}{" "}
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
  );
};

export default ProductsDetails;
