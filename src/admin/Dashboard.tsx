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

      console.log("session:", session); // تأكد هل الجلسة موجودة

      if (!session) {
        console.log("No session, redirecting to /login");
        navigate("/login", { replace: true }); // استخدم replace لمنع العودة للوحة
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
    <Box sx={{ width: "100%", p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        لوحة التحكم
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={async () => {
          await supabase.auth.signOut();
          navigate("/login");
        }}
      >
        تسجيل الخروج
      </Button>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">لوحة التحكم</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          العودة إلى الموقع
        </Button>
      </Box>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="الأقسام" />
        <Tab label="المنتجات" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {tabIndex === 0 && <CategoriesPanel />}
        {tabIndex === 1 && <ProductsPanel />}
      </Box>
    </Box>
  );
};

export default Dashboard;
