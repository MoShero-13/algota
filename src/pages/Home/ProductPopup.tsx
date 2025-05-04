import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import useNews from "../../hooks/useNews";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useTranslation } from "react-i18next";

const ProductPopup = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // تحقق إذا كان المسار الرئيسي فقط "/"
    if (location.pathname === "/" && location.hash === "") {
      setOpen(true); // افتح النافذة
    } else {
      setOpen(false); // أغلق النافذة في أي مسار آخر
    }
  }, [location.pathname, location.hash]);

  const handleClose = () => {
    setOpen(false);
  };

  const { data } = useNews();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          height: "50%",
          borderRadius: "15px",
          backgroundColor: "#f4f8f4", // خلفية خفيفة مستوحاة من الأخضر
          padding: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#007236", // اللون الأساسي
          textAlign: "center",
        }}
      >
        {t("productnews")}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {data.slice(0, 3).map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#eaf4ea",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    backgroundColor: "#eaf4ea",
                    borderRadius: "10px 10px 0 0",
                    width: {
                      xs: "45%",
                      md: "70%",
                    },
                    margin: "auto",
                  }}
                />
                <CardContent
                  sx={{
                    backgroundColor: "#eaf4ea", // لون خلفية مستوحى من الأخضر الفاتح
                    textAlign: "center",
                  }}
                >
                  {i18n.language === "ar" && (
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        color: "#007236", // اللون الأساسي
                      }}
                    >
                      {product.name}
                    </Typography>
                  )}
                  {i18n.language === "en" && (
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        color: "#007236", // اللون الأساسي
                      }}
                    >
                      {product.nameEn}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            backgroundColor: "#007236", // اللون الأساسي
            color: "#ffffff",
            margin: "auto",
            width: "50%",
            "&:hover": {
              backgroundColor: "#005a29", // لون داكن قليلاً للزر عند التمرير
            },
          }}
        >
          {t("close")}
        </Button>
        <Link
          to="/#news"
          onClick={handleClose}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#007236",
              color: "#007236",
              margin: "0 10px",
              "&:hover": {
                backgroundColor: "#f0f8f0",
                borderColor: "#005a29",
                color: "#005a29",
              },
            }}
          >
            {t("details")}
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default ProductPopup;
