import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

/* تعريف نوع بيانات القسم */
type Category = {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  description1_ar: string;
  description1_en: string;
  image: string;
};

const emptyCategoryForm: Omit<Category, "id"> = {
  name_ar: "",
  name_en: "",
  description_ar: "",
  description_en: "",
  description1_ar: "",
  description1_en: "",
  image: "",
};

const CategoriesPanel = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] =
    useState<Omit<Category, "id">>(emptyCategoryForm);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select();
    if (error) {
      alert("حدث خطأ أثناء جلب الأقسام: " + error.message);
      setLoading(false);
      return;
    }
    setCategories(data as Category[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenDialog = (category: Category | null = null) => {
    setEditingCategory(category);
    setFormData(
      category
        ? {
            name_ar: category.name_ar,
            name_en: category.name_en,
            description_ar: category.description_ar,
            description_en: category.description_en,
            description1_ar: category.description1_ar,
            description1_en: category.description1_en,
            image: category.image,
          }
        : emptyCategoryForm
    );
    setImageFile(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
    setFormData(emptyCategoryForm);
    setImageFile(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage
      .from("categories-images")
      .upload(fileName, imageFile);
    if (error) {
      alert("فشل رفع الصورة: " + error.message);
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("categories-images")
      .getPublicUrl(fileName);
    return urlData?.publicUrl || null;
  };

  const handleSubmit = async () => {
    if (!formData.name_ar.trim() || !formData.name_en.trim()) {
      alert("يرجى إدخال اسم القسم بالعربية والإنجليزية");
      return;
    }
    setLoading(true);

    let imageUrl = formData.image;
    if (imageFile) {
      const uploaded = await handleImageUpload();
      if (uploaded) imageUrl = uploaded;
    }

    const payload = { ...formData, image: imageUrl };

    if (editingCategory) {
      const { error } = await supabase
        .from("categories")
        .update(payload)
        .eq("id", editingCategory.id);
      if (error) {
        alert("خطأ أثناء التحديث: " + error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from("categories").insert(payload);
      if (error) {
        alert("خطأ أثناء الإضافة: " + error.message);
        setLoading(false);
        return;
      }
    }

    await fetchCategories();
    handleCloseDialog();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا القسم؟")) return;

    setLoading(true);
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) alert("خطأ أثناء الحذف: " + error.message);

    await fetchCategories();
    setLoading(false);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">إدارة الأقسام</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          disabled={loading}
        >
          قسم جديد
        </Button>
      </Box>

      <Grid container spacing={2}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat.id}>
            <Card sx={{ background: "#1e1e1e", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">
                  {cat.name_ar} / {cat.name_en}
                </Typography>
                <Typography variant="body2" color="#bbb" sx={{ minHeight: 60 }}>
                  {cat.description1_ar
                    ? cat.description1_ar.slice(0, 60) + "..."
                    : "-"}
                </Typography>
              </CardContent>
              <Box display="flex" justifyContent="flex-end" p={1}>
                <IconButton
                  color="info"
                  onClick={() => handleOpenDialog(cat)}
                  disabled={loading}
                  aria-label="تعديل"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(cat.id)}
                  disabled={loading}
                  aria-label="حذف"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingCategory ? "تعديل القسم" : "إضافة قسم جديد"}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name_ar"
            label="اسم القسم (عربي)"
            value={formData.name_ar}
            onChange={handleChange}
            fullWidth
            margin="dense"
            autoFocus
          />
          <TextField
            name="name_en"
            label="اسم القسم (إنجليزي)"
            value={formData.name_en}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="description1_ar"
            label="الوصف (عربي)"
            value={formData.description1_ar}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
          <TextField
            name="description1_en"
            label="الوصف (إنجليزي)"
            value={formData.description1_en}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
          <TextField
            name="description_ar"
            label="الوصف (عربي)"
            value={formData.description_ar}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
          <TextField
            name="description_en"
            label="الوصف (إنجليزي)"
            value={formData.description_en}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            اختر صورة
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImageFile(file);
              }}
            />
          </Button>
          {formData.image && (
            <Box mt={2}>
              <img
                src={formData.image}
                alt="صورة القسم"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            إلغاء
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {editingCategory ? "تحديث" : "إضافة"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesPanel;
