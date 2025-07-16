import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

// إعداد cache للـ RTL إذا تحتاج
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const theme = createTheme({
  typography: {
    fontFamily: `'cocon-next-arabic', sans-serif`,
  },
  palette: {
    primary: {
      main: "#007236",
    },
  },
  direction: "rtl",
});

const PageWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const LoginContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)", // شفافية خفيفة مثل الـ footer
  backdropFilter: "blur(12px)",
  borderRadius: "12px",
  padding: theme.spacing(3),
  maxWidth: 400,
  width: "100%",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  border: `1.5px solid ${theme.palette.primary.main}`, // بوردر أخضر خفيف
  textAlign: "center",
}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "16px",
  "& .MuiOutlinedInput-input": {
    color: "#fff",
    fontFamily: `'cocon-next-arabic', sans-serif`,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // خلفية شفافة خفيفة
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&:hover fieldset": {
      borderColor: "#3fdb89",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3fdb89",
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: `'cocon-next-arabic', sans-serif`,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#3fdb89",
  },
}));

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("يرجى تعبئة البريد الإلكتروني وكلمة المرور");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return alert("فشل تسجيل الدخول: " + error.message);
    navigate("/AdminPanel");
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <PageWrapper
          dir="rtl"
          sx={{ width: { xs: "90%", margin: "auto", md: "100%" } }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "rgb(221, 221, 221)",
              textShadow: "7px 8px 15px",
              fontWeight: "bold",
              mb: 3,
              fontFamily: `'cocon-next-arabic', sans-serif`,
            }}
          >
            تسجيل الدخول
          </Typography>
          <LoginContainer sx={{ width: { xs: "80%", md: "100%" } }}>
            <StyledTextField
              fullWidth
              label=" البريد الإلكتروني"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{
                dir: "rtl",
                "aria-label": "اسم المستخدم أو البريد الإلكتروني",
              }}
            />

            <StyledTextField
              fullWidth
              type="password"
              label="كلمة المرور"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ dir: "rtl", "aria-label": "كلمة المرور" }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "rgba(0, 114, 53, 0.23)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "1.1rem",
                "&:hover": {
                  backgroundColor: "#007236",
                },
              }}
              onClick={handleLogin}
            >
              تسجيل الدخول
            </Button>
          </LoginContainer>
        </PageWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
}
