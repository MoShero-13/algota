import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import useProducts from "../../hooks/useProducts";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "motion/react";

const Products = () => {
  const { data } = useProducts();
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 0.8,
          x: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        style={{
          margin: "60px 0",
          textAlign: "center",
          fontSize: "50px",
          color: "#ddd",
          textShadow: "7px 8px 15px",
          opacity: "0.8",
        }}
        id="products"
      >
        {t("productTitle")}
      </motion.h1>
      <Grid
        container
        spacing={1}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        width={"90%"}
        margin={"auto"}
      >
        {data.map((index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.5 }}
            style={{ margin: "10px auto" }}
            key={index.id}
          >
            <Card
              sx={{
                width: { xs: "320px", md: "400px" },
                margin: "10px auto",
                display: "flex",
                backgroundColor: "#2D513F",
                borderRadius: "14px",
                boxShadow: "4px 4px 25px #000",
                "&:hover": {
                  boxShadow: "10px 10px 20px #000",
                  transform: "scale(1.03)",
                  transition: "transform .15s ease-in",
                },
              }}
            >
              {index ? (
                <CardMedia
                  sx={{ width: "50%" }}
                  image={index.image}
                  title={index.name}
                />
              ) : (
                <Skeleton variant="rectangular" width={"100%"} height={200} />
              )}
              <Link
                to={`/products/${index.id}#landing`}
                style={{ width: "50%" }}
              >
                <CardContent
                  sx={{
                    height: 150,
                    alignContent: "center",
                    textAlign: "center",
                    backdropFilter: "blur(8px)",
                    color: "#3fdb89",
                  }}
                >
                  {i18n.language === "en" && (
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      dir="ltr"
                    >
                      {index.nameEn}
                    </Typography>
                  )}
                  {i18n.language === "ar" && (
                    <Typography gutterBottom variant="h5" component="div">
                      {index.name}
                    </Typography>
                  )}
                  {i18n.language === "en" && (
                    <Typography
                      variant="body2"
                      sx={{ direction: "ltr", color: "#ddd" }}
                    >
                      {index.descrptionEn}
                    </Typography>
                  )}
                  {i18n.language === "ar" && (
                    <Typography variant="body2" sx={{ color: "#ddd" }}>
                      {index.descrption}
                    </Typography>
                  )}
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </Grid>
    </>
  );
};

export default Products;
