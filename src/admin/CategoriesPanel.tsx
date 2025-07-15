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

type Category = {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  description1_ar: string;
  description1_en: string;
  image: string;
  inside_image: string;
};

const emptyCategoryForm: Omit<Category, "id"> = {
  name_ar: "",
  name_en: "",
  description_ar: "",
  description_en: "",
  description1_ar: "",
  description1_en: "",
  image: "",
  inside_image: "",
};

const CategoriesPanel = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] =
    useState<Omit<Category, "id">>(emptyCategoryForm);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [insideImageFile, setInsideImageFile] = useState<File | null>(null);

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
            inside_image: category.inside_image,
          }
        : emptyCategoryForm
    );
    setImageFile(null);
    setInsideImageFile(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
    setFormData(emptyCategoryForm);
    setImageFile(null);
    setInsideImageFile(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage
      .from("categories-images")
      .upload(fileName, file);
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
    let insideImageUrl = formData.inside_image;

    if (imageFile) {
      const uploaded = await handleImageUpload(imageFile);
      if (uploaded) imageUrl = uploaded;
    }

    if (insideImageFile) {
      const uploadedInside = await handleImageUpload(insideImageFile);
      if (uploadedInside) insideImageUrl = uploadedInside;
    }

    const payload = {
      ...formData,
      image: imageUrl,
      inside_image: insideImageUrl,
    };

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
        <Typography variant="h5" sx={{ color: "#fff" }}>
          إدارة الأقسام
        </Typography>
        <Button
          onClick={() => handleOpenDialog()}
          disabled={loading}
          sx={{
            backgroundColor: "#007236",
            color: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 114, 54, 0.7)", // شفافية أخف من اللون الأساسي
              backdropFilter: "blur(4px)",
              boxShadow: "0 0 8px rgba(0, 114, 54, 0.6)",
            },
          }}
        >
          قسم جديد <AddIcon />
        </Button>
      </Box>

      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat) => (
            <Grid
              item
              xs={12}
              sm={10}
              md={6}
              lg={4}
              sx={{ maxWidth: "100%" }}
              key={cat.id}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  backdropFilter: "blur(12px)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: 4,
                  overflow: "hidden",
                  mx: "auto",
                  color: "#fff",
                }}
              >
                {cat.image && (
                  <Box
                    component="img"
                    src={cat.image}
                    alt={cat.name_ar}
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" align="center">
                    {cat.name_ar} / {cat.name_en}
                  </Typography>
                </CardContent>
                <Box display="flex" justifyContent="center" p={1} gap={1}>
                  <IconButton
                    onClick={() => handleOpenDialog(cat)}
                    disabled={loading}
                    aria-label="تعديل"
                    sx={{ color: "rgb(63, 219, 137)" }}
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
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: "#007236", fontWeight: "bold" }}>
          {editingCategory ? "تعديل القسم" : "إضافة قسم جديد"}
        </DialogTitle>

        <DialogContent>
          {/* الحقول النصية */}
          <TextField
            name="name_ar"
            label="اسم القسم (عربي)"
            value={formData.name_ar}
            onChange={handleChange}
            fullWidth
            margin="dense"
            autoFocus
            sx={{
              "& label.Mui-focused": { color: "#007236" },
              "& .MuiInput-underline:after": { borderBottomColor: "#007236" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#007236" },
                "&.Mui-focused fieldset": { borderColor: "#007236" },
              },
            }}
          />
          <TextField
            name="name_en"
            label="اسم القسم (إنجليزي)"
            value={formData.name_en}
            onChange={handleChange}
            fullWidth
            margin="dense"
            sx={{
              "& label.Mui-focused": { color: "#007236" },
              "& .MuiInput-underline:after": { borderBottomColor: "#007236" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#007236" },
                "&.Mui-focused fieldset": { borderColor: "#007236" },
              },
            }}
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
            sx={{
              "& label.Mui-focused": { color: "#007236" },
              "& .MuiInput-underline:after": { borderBottomColor: "#007236" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#007236" },
                "&.Mui-focused fieldset": { borderColor: "#007236" },
              },
            }}
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
            sx={{
              "& label.Mui-focused": { color: "#007236" },
              "& .MuiInput-underline:after": { borderBottomColor: "#007236" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#007236" },
                "&.Mui-focused fieldset": { borderColor: "#007236" },
              },
            }}
          />
          <TextField
            name="description_ar"
            label="الوصف الكامل (عربي)"
            value={formData.description_ar}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
            sx={{
              "& label.Mui-focused": { color: "#007236" },
              "& .MuiInput-underline:after": { borderBottomColor: "#007236" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#007236" },
                "&.Mui-focused fieldset": { borderColor: "#007236" },
              },
            }}
          />
          <TextField
            name="description_en"
            label="الوصف الكامل (إنجليزي)"
            value={formData.description_en}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
            sx={{
              "& label.Mui-focused": { color: "#007236" },
              "& .MuiInput-underline:after": { borderBottomColor: "#007236" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#007236" },
                "&.Mui-focused fieldset": { borderColor: "#007236" },
              },
            }}
          />

          {/* زر رفع صورة القسم */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              mt: 2,
              borderColor: "#007236",
              color: "#007236",
              "&:hover": {
                backgroundColor: "rgba(0, 114, 54, 0.1)",
                borderColor: "#007236",
              },
            }}
          >
            اختر صورة القسم
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

          {/* زر رفع صورة داخلية */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              mt: 2,
              borderColor: "#007236",
              color: "#007236",
              "&:hover": {
                backgroundColor: "rgba(0, 114, 54, 0.1)",
                borderColor: "#007236",
              },
            }}
          >
            اختر صورة داخلية
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setInsideImageFile(file);
              }}
            />
          </Button>
          {formData.inside_image && (
            <Box mt={2}>
              <img
                src={formData.inside_image}
                alt="صورة داخلية"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          {/* زر الإلغاء */}
          <Button
            onClick={handleCloseDialog}
            disabled={loading}
            sx={{
              border: "1px solid #007236",
              color: "#007236",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "rgba(0, 114, 54, 0.1)",
              },
            }}
          >
            إلغاء
          </Button>

          {/* زر الإضافة أو التحديث */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              marginRight: "10px",
              backgroundColor: "#007236",
              "&:hover": {
                backgroundColor: "#005f2d",
              },
            }}
          >
            {editingCategory ? "تحديث" : "إضافة"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesPanel;
