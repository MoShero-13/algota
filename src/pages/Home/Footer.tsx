import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  styled,
} from "@mui/material";

import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { CacheProvider } from "@emotion/react";
import cacheRtl from "../../theme/casheRtl";
import Swal from "sweetalert2";
import { FormEvent } from "react";
import { motion } from "motion/react";
import EndFooter from "./EndFooter";

const StyledFooter = styled(Box)(() => ({
  backgroundColor: "transparent",
  color: "#ffffff",
  padding: "48px 0",
  position: "relative",
  overflow: "hidden",
}));

const StyledContactBox = styled(Paper)(() => ({
  color: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff1a",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  "& .MuiOutlinedInput-input": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "#fff",
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      color: "#fff",
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      color: "#fff",
      borderColor: "#3fdb89",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#3fdb89",
  },
});
const Footer = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();

  /* -------------------------------------------------------------------------- */
  /*                                   Contact                                  */
  /* -------------------------------------------------------------------------- */
  // const [result, setResult] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "1eba2231-4d7a-4727-a92f-0170bac36de5");

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
      event.currentTarget.reset();
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
      event.currentTarget.reset();
    } else {
      console.log("Error", data);
      // setResult(data.message);
    }
  };
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 0.8,
          y: 0,
          x: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        style={{
          marginTop: "120px",
          textAlign: "center",
          fontSize: "50px",
          color: "#ddd",
          textShadow: "7px 8px 15px",
          opacity: "0.8",
        }}
        id="contact"
      >
        {t("contact")}
      </motion.h1>
      <StyledFooter role="contentinfo" dir={t("dir")}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom component="h2">
                {t("ourlocation")}
              </Typography>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 0.8,
                  y: 0,
                  x: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <Box
                  sx={{ width: "100%", height: "400px", borderRadius: "8px" }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22372.019598036248!2d36.36457583581547!3d33.53724832487041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e5e28af3dd6f%3A0x295ff83ddb3745c9!2z2LTYsdmD2Kkg2KfZhNi62YjYt9ipINmE2YTZhdmG2KrYrNin2Kog2KfZhNi62LDYp9im2YrYqQ!5e0!3m2!1sen!2s!4v1728819374729!5m2!1sen!2s"
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "14px",
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="iframe"
                  ></iframe>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{
                  opacity: 0.8,
                  y: 0,
                  x: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <StyledContactBox>
                  <Typography
                    variant="h5"
                    gutterBottom
                    component="h2"
                    sx={{ marginBottom: "20px" }}
                  >
                    {t("forContact")}
                  </Typography>
                  {i18n.language === "en" && (
                    <form onSubmit={onSubmit}>
                      <StyledTextField
                        fullWidth
                        label={t("name")}
                        placeholder={t("input-1")}
                        name="name"
                        required
                        aria-label="Name input field"
                      />
                      <StyledTextField
                        fullWidth
                        label={t("email")}
                        placeholder={t("input-2")}
                        name="email"
                        type="email"
                        required
                        aria-label="Email input field"
                      />
                      <StyledTextField
                        fullWidth
                        label={t("message")}
                        placeholder={t("input-3")}
                        name="message"
                        multiline
                        rows={4}
                        required
                        aria-label="Message input field"
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#0072367a",
                          "&:hover": {
                            backgroundColor: "#007236",
                          },
                        }}
                        fullWidth
                      >
                        {t("submit")}
                      </Button>
                    </form>
                  )}
                  {i18n.language === "ar" && (
                    <CacheProvider value={cacheRtl}>
                      <form onSubmit={onSubmit}>
                        <StyledTextField
                          fullWidth
                          label={t("name")}
                          placeholder={t("input-1")}
                          name="name"
                          required
                          aria-label="Name input field"
                        />
                        <StyledTextField
                          fullWidth
                          label={t("email")}
                          placeholder={t("input-2")}
                          name="email"
                          type="email"
                          required
                          aria-label="Email input field"
                        />
                        <StyledTextField
                          fullWidth
                          label={t("message")}
                          placeholder={t("input-3")}
                          name="message"
                          multiline
                          rows={4}
                          required
                          aria-label="Message input field"
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            backgroundColor: "#0072367a",
                            "&:hover": {
                              backgroundColor: "#007236",
                            },
                          }}
                          fullWidth
                        >
                          {t("submit")}
                        </Button>
                      </form>
                    </CacheProvider>
                  )}
                </StyledContactBox>
              </motion.div>
              <Box mt={2}>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    maxWidth: "230px",
                    justifyContent: "space-between",
                    margin: "auto",
                  }}
                >
                  <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                  {t("address")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    maxWidth: "230px",
                    justifyContent: "space-between",
                    margin: "auto",
                  }}
                >
                  <FaPhone style={{ marginRight: "8px" }} />
                  +963-944218493
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "230px",
                    justifyContent: "space-between",
                    margin: "auto",
                  }}
                >
                  <FaEnvelope style={{ marginRight: "8px" }} /> info@al-gota.net
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </StyledFooter>
      <EndFooter />
    </>
  );
};

export default Footer;
