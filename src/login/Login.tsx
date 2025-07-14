import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return alert("فشل تسجيل الدخول: " + error.message);
    navigate("/AdminPanel");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 10 }}>
      <Button onClick={() => navigate("/")} variant="outlined" sx={{ mb: 3 }}>
        العودة إلى الموقع
      </Button>

      <Typography variant="h5">تسجيل دخول المشرف</Typography>
      <TextField
        fullWidth
        label="الإيميل"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        label="كلمة المرور"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button fullWidth variant="contained" onClick={handleLogin}>
        دخول
      </Button>
    </Box>
  );
}
