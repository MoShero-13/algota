import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import CategoriesPanel from "./CategoriesPanel";
import ProductsPanel from "./ProductsPanel";

const Dashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", { replace: true });
      } else {
        setLoadingAuth(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loadingAuth) {
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }}>
        ...جاري التحقق من تسجيل الدخول
      </Typography>
    );
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "90%", margin: "auto" }}>
      {/* العنوان الرئيسي + الأزرار على نفس السطر */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          mb: 4,
        }}
      >
        {/* العنوان على اليمين */}
        <Typography
          variant="h4"
          sx={{ color: "#fff", textShadow: "7px 8px 15px", opacity: "0.8" }}
        >
          لوحة التحكم
        </Typography>

        {/* الأزرار على اليسار */}
        <Box sx={{ display: "flex", gap: "25px" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#007236",
              color: "#fff",
              borderColor: "#007236",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#007236",
                color: "#007236",
                backgroundColor: "#fff",
              },
            }}
          >
            العودة إلى الموقع
          </Button>

          <Button
            variant="outlined"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/login");
            }}
            sx={{
              backgroundColor: "#d32f2f",
              color: "#fff",
              borderColor: "#d32f2f",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#d32f2f",
                color: "#d32f2f",
                backgroundColor: "#fff",
              },
            }}
          >
            تسجيل الخروج
          </Button>
        </Box>
      </Box>

      {/* التبويبات */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#3fdb89", // الأخضر الحقيقي
            height: 3,
          },
          "& .MuiTab-root": {
            color: "#fff", // النص في التبويبات غير المحددة
            fontWeight: 500,
            fontFamily: "'cocon-next-arabic', sans-serif",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#3fdb89", // النص عند التحديد
            fontWeight: "bold",
          },
        }}
      >
        <Tab label="الأقسام" />
        <Tab label="المنتجات" />
      </Tabs>

      {/* محتوى التبويبة */}
      <Box sx={{ mt: 4 }}>
        {tabIndex === 0 && <CategoriesPanel />}
        {tabIndex === 1 && <ProductsPanel />}
      </Box>
    </Box>
  );
};

export default Dashboard;
