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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { SelectChangeEvent } from "@mui/material";

// Types
interface Product {
  id: number;
  category_id: string;
  subcategory_id: string | null;
  name_ar: string;
  name_en: string;
  pieceWeight: string;
  numOf: string;
  parcelBarcode: string;
  image: string;
  packing_type: string;
}

interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  inside_image: string;
}

interface Subcategory {
  id: string;
  category_id: string;
  name_ar: string;
  name_en: string;
}

const emptyProductForm: Omit<Product, "id"> = {
  category_id: "",
  subcategory_id: null,
  name_ar: "",
  name_en: "",
  pieceWeight: "",
  numOf: "",
  parcelBarcode: "",
  image: "",
  packing_type: "",
};

const ProductPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] =
    useState<Omit<Product, "id">>(emptyProductForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select();
    if (error) return alert("خطأ في جلب الأقسام: " + error.message);
    setCategories(data);
  };

  const fetchSubcategories = async () => {
    const { data, error } = await supabase.from("subcategories").select();
    if (error) return alert("خطأ في جلب الأقسام الفرعية: " + error.message);
    setSubcategories(data);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select();
    if (error) return alert("خطأ في جلب المنتجات: " + error.message);
    setProducts(data);
    setLoading(false);
  };

  const handleOpenDialog = (product: Product | null = null) => {
    setEditingProduct(product);
    setFormData(product ? { ...product } : emptyProductForm);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData(emptyProductForm);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name === "category_id") {
      setFormData((prev) => ({ ...prev, [name]: value, subcategory_id: null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    setUploading(true);
    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);
    if (error) return alert("فشل رفع الصورة: " + error.message);
    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);
    setFormData((prev) => ({ ...prev, image: data.publicUrl }));
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!formData.name_ar || !formData.name_en || !formData.category_id) {
      return alert("يرجى إدخال الاسم واختيار القسم");
    }
    setLoading(true);
    const payload = {
      ...formData,
      subcategory_id: formData.subcategory_id || null,
    };

    const { error } = editingProduct
      ? await supabase
          .from("products")
          .update(payload)
          .eq("id", editingProduct.id)
      : await supabase.from("products").insert(payload);

    if (error) alert("خطأ: " + error.message);
    else {
      await fetchProducts();
      handleCloseDialog();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;
    setLoading(true);
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) alert("خطأ أثناء الحذف: " + error.message);
    await fetchProducts();
    setLoading(false);
  };

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.category_id === formData.category_id
  );

  const textFieldSx = {
    "& label.Mui-focused": { color: "#007236" },
    "& .MuiInput-underline:after": { borderBottomColor: "#007236" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#ccc" },
      "&:hover fieldset": { borderColor: "#007236" },
      "&.Mui-focused fieldset": { borderColor: "#007236" },
      borderRadius: 1.5,
    },
  };

  const buttonSx = {
    backgroundColor: "#007236",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(0, 114, 54, 0.85)",
      boxShadow: "0 0 8px rgba(0, 114, 54, 0.6)",
    },
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
          إدارة المنتجات
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
          sx={buttonSx}
          disabled={loading}
        >
          منتج جديد <AddIcon />
        </Button>
      </Box>

      {!selectedCategoryId ? (
        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat) => (
            <Grid item key={cat.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0px 0px 15px rgba(0, 114, 54, 0.3)",
                    transform: "scale(1.02)",
                  },
                }}
                onClick={() => setSelectedCategoryId(cat.id)}
              >
                {cat.inside_image && (
                  <Box
                    component="img"
                    src={cat.inside_image}
                    alt={cat.name_ar}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                    }}
                  />
                )}
                <CardContent
                  sx={{ backgroundColor: "#007236", textAlign: "center" }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    {cat.name_ar}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Box textAlign="right" my={3}>
            <Button
              variant="outlined"
              onClick={() => setSelectedCategoryId(null)}
              sx={{
                color: "#fff",
                backgroundColor: "rgba(0, 114, 54, 0.05)",
                borderColor: "#fff",
                borderRadius: 2,
                "&:hover": {
                  borderColor: "#007236",
                  backgroundColor: "#007236",
                },
              }}
            >
              ← الرجوع إلى الأقسام
            </Button>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {products
              .filter((product) => product.category_id === selectedCategoryId)
              .map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.id}
                  sx={{ maxWidth: "280px" }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      maxWidth: 280,
                      backdropFilter: "blur(12px)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: 4,
                      overflow: "hidden",
                      mx: "auto",
                      color: "#fff",
                    }}
                  >
                    {product.image && (
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.name_ar}
                        sx={{
                          width: "50%",
                          objectFit: "cover",
                          margin: "auto 25%",
                        }}
                      />
                    )}
                    <CardContent>
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{ mb: 1, fontSize: "1rem" }}
                      >
                        {product.name_ar} / {product.name_en}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                        القسم الفرعي:{" "}
                        {subcategories.find(
                          (s) => s.id === product.subcategory_id
                        )?.name_ar || "-"}
                      </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="center" p={1} gap={1}>
                      <IconButton
                        onClick={() => handleOpenDialog(product)}
                        sx={{ color: "rgb(63, 219, 137)" }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      )}

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "#007236", fontWeight: "bold" }}>
          {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="اسم المنتج (عربي)"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            sx={textFieldSx}
            autoFocus
          />
          <TextField
            label="اسم المنتج (إنجليزي)"
            name="name_en"
            value={formData.name_en}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            sx={textFieldSx}
          />
          <FormControl fullWidth margin="dense" sx={textFieldSx}>
            <InputLabel id="category-label">القسم</InputLabel>
            <Select
              labelId="category-label"
              name="category_id"
              value={formData.category_id}
              onChange={handleSelectChange}
              label="القسم"
            >
              <MenuItem value="">
                <em>اختر القسم</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name_ar}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            margin="dense"
            disabled={!filteredSubcategories.length}
            sx={textFieldSx}
          >
            <InputLabel id="subcategory-label">القسم الفرعي</InputLabel>
            <Select
              labelId="subcategory-label"
              name="subcategory_id"
              value={formData.subcategory_id || ""}
              onChange={handleSelectChange}
              label="القسم الفرعي"
            >
              <MenuItem value="">
                <em>اختر القسم الفرعي</em>
              </MenuItem>
              {filteredSubcategories.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.name_ar}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="وزن القطعة"
            name="pieceWeight"
            value={formData.pieceWeight}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            sx={textFieldSx}
          />
          <TextField
            label="عدد القطع"
            name="numOf"
            value={formData.numOf}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            sx={textFieldSx}
          />
          <TextField
            label="باركود الطرد"
            name="parcelBarcode"
            value={formData.parcelBarcode}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            sx={textFieldSx}
          />
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              mt: 2,
              borderColor: "#007236",
              color: "#007236",
              borderRadius: 1.5,
            }}
          >
            اختر صورة المنتج
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </Button>
          {uploading && <CircularProgress size={24} sx={{ mt: 1 }} />}
          {formData.image && (
            <Box mt={2}>
              <img
                src={formData.image}
                alt="صورة المنتج"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  objectFit: "contain",
                  maxHeight: 200,
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{ border: "1px solid #007236", color: "#007236" }}
          >
            إلغاء
          </Button>
          <Button variant="contained" onClick={handleSubmit} sx={buttonSx}>
            {editingProduct ? "تحديث" : "إضافة"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductPanel;
