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

  // Fetch all data
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
    if (product) {
      setFormData({ ...product });
    } else {
      setFormData(emptyProductForm);
    }
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
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) {
      alert("فشل رفع الصورة: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    setFormData((prev) => ({ ...prev, image: publicUrlData.publicUrl }));
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

    if (error) {
      alert("خطأ: " + error.message);
    } else {
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

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">إدارة المنتجات</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          منتج جديد
        </Button>
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name_ar}</Typography>
                <Typography variant="body2">
                  القسم:{" "}
                  {categories.find((c) => c.id === product.category_id)
                    ?.name_ar || "-"}
                </Typography>
                <Typography variant="body2">
                  القسم الفرعي:{" "}
                  {subcategories.find((s) => s.id === product.subcategory_id)
                    ?.name_ar || "-"}
                </Typography>
                {product.image && (
                  <Box mt={1}>
                    <img
                      src={product.image}
                      alt={product.name_ar}
                      style={{ width: "100%", height: 150, objectFit: "cover" }}
                    />
                  </Box>
                )}
              </CardContent>
              <Box display="flex" justifyContent="flex-end" p={1}>
                <IconButton onClick={() => handleOpenDialog(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
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
          />
          <TextField
            label="اسم المنتج (إنجليزي)"
            name="name_en"
            value={formData.name_en}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
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
          />
          <TextField
            label="عدد القطع"
            name="numOf"
            value={formData.numOf}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="باركود الطرد"
            name="parcelBarcode"
            value={formData.parcelBarcode}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />

          <Box mt={2}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && <CircularProgress size={24} />}
            {formData.image && (
              <Box mt={1}>
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            إلغاء
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {editingProduct ? "تحديث" : "إضافة"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductPanel;
