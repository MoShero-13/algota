import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CarouselContainer = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  color: "#ddd",
}));

const ProductCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive", // Prevent `isActive` from being passed to the DOM
})<{ scale: number; isActive: boolean }>(({ scale, isActive }) => ({
  position: "absolute",
  transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
  transform: `scale(${scale})`,
  opacity: isActive ? 1 : 0,
  pointerEvents: isActive ? "auto" : "none",
  width: "100%",
  height: "100%",
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "#007236",
  },
}));

import image1 from "../../assets/products/12.webp";
import image2 from "../../assets/products/21.webp";
import image3 from "../../assets/products/15.webp";
import image4 from "../../assets/products/4.webp";
import image5 from "../../assets/products/5.webp";

const products = [
  {
    id: 1,
    name: "قسم الحلويات والكعك",
    nameEn: "Sweets and Cakes section",
    descrption1:
      "- الحلويات هي تاج المطبخ العربي والبرازق الشامية وراحة الحلقوم اختصاص المطبخ السوري , كما تقدم شركتنا الكعك الشامي الممتاز بأنواعه المختلفة المصنعة من اجود انواع الدقيق والسمسم .",
    descrption1En:
      "Sweets are the crown of the Arab cuisine, the Levantine, and the comfort of Al -Hilqoum, the specialty of the Syrian cuisine. Our company offers the excellent Shami cakes of its various types manufactured from the finest types of flour and sesame.",
    image: image1,
  },
  {
    id: 2,
    name: "قسم المكدوس",
    nameEn: " Makdous section",
    descrption1:
      "- المكدوس الشامي الفاخر يعد من اجود ثمار الباذنجان ويتم تحضيره كل عام على طريقة ربات البيوت ضمن افضل العبوات.",
    descrption1En:
      "- The luxurious Levantine Makdous is one of the finest eggplant fruits and is prepared whole A year in the style of housewives, among the best packages.",
    image: image2,
  },
  {
    id: 3,
    name: "قسم معجون الطماطم",
    nameEn: "Tomato paste section",
    descrption1:
      "- معجون الطماطم مشتقاته المستخلصة على طريق البيت الشامي بلمسات مواكبة لتقنية التصنيع الغذائي الحديثة.",
    descrption1En:
      "- Tomato paste and its derivatives extracted on the Levantine road with touches Keeping pace with modern food manufacturing technology.",
    image: image3,
  },
  {
    id: 4,
    name: "قسم الزيوت",
    nameEn: "Oils section",
    descrption1:
      "- من اجود انواع الزيوت يتم الحصول عليه بعصر الزيتون على البارد ويمتاز بجودة محلية عالية تضاهي العالمية .",
    descrption1En:
      "- One of the finest types of oils, obtained by cold pressing olives It is characterized by high local quality comparable to international quality.",
    image: image4,
  },
  {
    id: 5,
    name: "قسم الزيتون",
    nameEn: "Olive section",
    descrption1:
      "- تقدم شركتنا هذا المنتج بكل اصنافه وانواعه كما تقدمه رباب البيوت لكن بطريقة مطورة.",
    descrption1En:
      "- Our company offers this product in all its forms and types, just as homeowners offer it But in an improved way.",
    image: image5,
  },
];

const Landing1 = () => {
  const [t, i18n] = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const nextProduct = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, []);

  const previousProduct = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isAutoPlay) {
      interval = setInterval(nextProduct, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, nextProduct]);

  const handleMouseEnter = () => setIsAutoPlay(true);
  const handleMouseLeave = () => setIsAutoPlay(true);

  const isMobile1 = useMediaQuery("(max-width:600px)");

  return (
    <div dir={t("dir")} style={{ marginTop: "50px" }}>
      <CarouselContainer
        sx={{
          height: {
            md: "50vh",
            lg: "100vh",
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Grid container spacing={0} sx={{ height: "100%" }}>
          {/* Left Side (Text Content) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 4,
            }}
          >
            {products.map((product, index) => (
              <Box
                key={product.id}
                sx={{
                  textAlign: "center",
                  padding: "40px",
                  opacity: index === currentIndex ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  position: index === currentIndex ? "relative" : "absolute",
                }}
              >
                {i18n.language === "ar" && (
                  <>
                    {" "}
                    <Typography variant={isMobile1 ? "h4" : "h3"} gutterBottom>
                      شركة الغوطة الغذائية
                    </Typography>
                    <Typography
                      variant={isMobile1 ? "h4" : "h3"}
                      style={{ color: "#3fdb89" }}
                      gutterBottom
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      display={isMobile1 ? "none" : "block"}
                      paragraph
                    >
                      {product.descrption1}
                    </Typography>
                  </>
                )}
                {i18n.language === "en" && (
                  <>
                    {" "}
                    <Typography variant={isMobile1 ? "h4" : "h3"} gutterBottom>
                      Algota Food Company
                    </Typography>
                    <Typography
                      variant={isMobile1 ? "h4" : "h3"}
                      style={{ color: "#3fdb89" }}
                      gutterBottom
                    >
                      {product.nameEn}
                    </Typography>
                    <Typography
                      variant="h6"
                      display={isMobile1 ? "none" : "block"}
                      paragraph
                    >
                      {product.descrption1En}
                    </Typography>
                  </>
                )}
              </Box>
            ))}
          </Grid>

          {/* Right Side (Images) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ position: "relative", height: isMobile ? "50vh" : "100%" }}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                scale={index === currentIndex ? 1 : 0.8}
                isActive={index === currentIndex}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: 0,
                  }}
                  loading="lazy"
                />
              </ProductCard>
            ))}
          </Grid>
        </Grid>

        {/* Navigation Buttons */}
        <NavigationButton
          onClick={previousProduct}
          sx={{ left: 20, backgroundColor: "#007236" }}
          aria-label="Previous product"
        >
          <FiChevronLeft size={24} />
        </NavigationButton>

        <NavigationButton
          onClick={nextProduct}
          sx={{ right: 20, backgroundColor: "#007236" }}
          aria-label="Next product"
        >
          <FiChevronRight size={24} />
        </NavigationButton>
      </CarouselContainer>
    </div>
  );
};

export default Landing1;
