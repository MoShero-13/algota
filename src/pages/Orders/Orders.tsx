import React, { useState } from "react";
import sections from "../../data/Orders";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  ListItemText,
  IconButton,
  styled,
  ListItemButton,
  TableBody,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  AlertProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Fade,
  Card,
} from "@mui/material";
import { Close, Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import { useTranslation } from "react-i18next";
import ExcelJS from "exceljs";
import EndFooter from "../Home/EndFooter";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    color: "#fff",
    BorderColor: "#fff",
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

type Product = {
  section: string;
  address: string;
  product: string;
  quantity: number;
};

const Orders: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                               QuantityChange                               */
  /* -------------------------------------------------------------------------- */
  const handleQuantityChange = (
    section: string,
    address: string,
    product: string,
    quantity: number
  ) => {
    const updatedProducts = [...selectedProducts];
    const existingIndex = updatedProducts.findIndex(
      (item) =>
        item.section === section &&
        item.address === address &&
        item.product === product
    );

    // Get product details
    const productDetails = sections
      .find((sec) => sec.title === section)
      ?.addresses.find((addr) => addr.address === address)
      ?.products.find((prod) => prod.id === product);

    const productSize = productDetails?.size || 0;
    const productWeight = productDetails?.grossWeight || 0;

    // Calculate current totals
    let totalSize = updatedProducts.reduce((acc, item) => {
      const prod = sections
        .find((sec) => sec.title === item.section)
        ?.addresses.find((addr) => addr.address === item.address)
        ?.products.find((prod) => prod.name === item.product);
      return acc + (prod?.size || 0) * item.quantity;
    }, 0);

    let totalWeight = updatedProducts.reduce((acc, item) => {
      const prod = sections
        .find((sec) => sec.title === item.section)
        ?.addresses.find((addr) => addr.address === item.address)
        ?.products.find((prod) => prod.name === item.product);
      return acc + (prod?.grossWeight || 0) * item.quantity;
    }, 0);

    // Adjust totals for current product
    if (existingIndex !== -1) {
      const currentProduct = updatedProducts[existingIndex];
      totalSize -= productSize * currentProduct.quantity;
      totalWeight -= productWeight * currentProduct.quantity;
    }

    totalSize += productSize * quantity;
    totalWeight += productWeight * quantity;

    // Validation: check if adding this product exceeds the limits
    if (totalSize > 55 || (totalWeight > 25000 && i18n.language === "en")) {
      setAlertConfig({
        open: true,
        message: "Cannot add product. Exceeds size or weight limits.",
        severity: "error",
      });
      return;
    }
    if (totalSize > 55 || (totalWeight > 25000 && i18n.language === "ar")) {
      setAlertConfig({
        open: true,
        message: "لا يمكن إضافة المنتج. لتجاوز حدود الحجم أو الوزن.",
        severity: "error",
      });
      return;
    }

    // Update product list
    if (existingIndex !== -1) {
      if (quantity === 0) {
        updatedProducts.splice(existingIndex, 1); // Remove if quantity is 0
      } else {
        updatedProducts[existingIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      updatedProducts.push({ section, address, product, quantity });
    }

    setSelectedProducts(updatedProducts);
  };

  /* -------------------------------------------------------------------------- */
  /*                                  SendEmail                                 */
  /* -------------------------------------------------------------------------- */
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    message: "",
    severity: "warning", // "error" | "success" | "info" | "warning"
  });

  const handleCloseAlert = () => {
    setAlertConfig((prev) => ({ ...prev, open: false }));
  };

  /* -------------------------------------------------------------------------- */
  /*                             Download Excel File                            */
  /* -------------------------------------------------------------------------- */

  const handleDownloadExcel = async () => {
    // Sort selected products by section name
    const sortedProducts = [...selectedProducts].sort((a, b) => {
      const sectionA = a.section.toLowerCase();
      const sectionB = b.section.toLowerCase();
      if (sectionA < sectionB) return -1;
      if (sectionA > sectionB) return 1;
      return 0;
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");

    // Define column headers
    const columnHeaders = [
      i18n.language === "en" ? "Product Name" : "اسـم المنتج",
      i18n.language === "en" ? "The type of package" : "نوع العبوة",
      i18n.language === "en" ? "Quantity" : "الكمية",
      i18n.language === "en" ? "Piece Weight (G)" : "وزن الوحدة (غ)",
      i18n.language === "en" ? "Pieces per Box" : "العدد ضمن الطرد",
      i18n.language === "en" ? "Size (M3)" : "الحجم (م3)",
      i18n.language === "en" ? "Gross Weight (KG)" : "الوزن القائم (كغ)",
      i18n.language === "en" ? "Barcode" : "باركود الطرد",
    ];

    // Group products by section
    // Group products by section
    const groupedProducts: { [key: string]: typeof selectedProducts } = {}; // Explicitly define the type
    sortedProducts.forEach((product) => {
      if (!groupedProducts[product.section]) {
        groupedProducts[product.section] = [];
      }
      groupedProducts[product.section].push(product);
    });
    worksheet.properties.defaultRowHeight = 18;
    // Add data to worksheet
    Object.keys(groupedProducts).forEach((section) => {
      // Insert Section Header Row
      const sectionRow = worksheet.addRow([
        i18n.language === "en" ? section : `القسم: ${section}`,
      ]);
      sectionRow.height = 50; // Set row height
      sectionRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 16 }; // Font size
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "007236" }, // Green background
        };
        cell.alignment = { horizontal: "center", vertical: "middle" }; // Center-align text
        cell.border = {
          top: { style: "double" },
          left: { style: "double" },
          bottom: { style: "double" },
          right: { style: "double" },
        };
      });

      // Merge cells for the section name
      worksheet.mergeCells(`A${sectionRow.number}:H${sectionRow.number}`);

      // Add column headers
      const headerRow = worksheet.addRow(columnHeaders);
      headerRow.height = 35; // Set row height
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "D3D3D3" }, // Gray background
        };
        cell.font = { bold: true, size: 14 }; // Bold font
        cell.alignment = { horizontal: "center", vertical: "middle" }; // Center alignment
        cell.border = {
          top: { style: "double" },
          left: { style: "double" },
          bottom: { style: "double" },
          right: { style: "double" },
        };
      });

      // Add products under each section
      groupedProducts[section].forEach((product) => {
        const productDetails = sections
          .find((sectionData) => sectionData.title === product.section)
          ?.addresses.find((address) => address.address === product.address)
          ?.products.find((p) => p.name === product.product);

        if (productDetails) {
          // Add data row and set height
          const dataRow = worksheet.addRow([
            product.product,
            product.address || "N/A",
            product.quantity,
            productDetails.pieceWieght || "N/A",
            productDetails.numOf || "N/A",
            productDetails.size || "N/A",
            productDetails.grossWeight || "N/A",
            productDetails.parcelBarcode || "N/A",
          ]);

          // Apply styles to cells
          dataRow.eachCell((cell) => {
            cell.font = { bold: true, size: 12 }; // Font size 12
            cell.alignment = { horizontal: "center", vertical: "middle" }; // Center alignment
            cell.border = {
              top: { style: "double" },
              left: { style: "double" },
              bottom: { style: "double" },
              right: { style: "double" },
            };
          });
        }
      });
    });

    // Auto-adjust column widths
    worksheet.columns = [
      { key: "product", width: 30 },
      { key: "address", width: 30 }, // Adjust width for the address column
      { key: "quantity", width: 15 },
      { key: "pieceWeight", width: 15 },
      { key: "numOf", width: 15 },
      { key: "size", width: 15 },
      { key: "grossWeight", width: 20 },
      { key: "parcelBarcode", width: 25 },
    ];

    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "orders.xlsx";
      link.click();

      URL.revokeObjectURL(link.href); // تنظيف الذاكرة بعد التحميل
    } catch (err) {
      console.error("Error downloading file:", err);
      alert(
        i18n.language === "en"
          ? "Failed to download file. Please try again."
          : "فشل في تحميل الملف. حاول مرة أخرى."
      );
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               State Management                             */
  /* -------------------------------------------------------------------------- */
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const [openAddresses, setOpenAddresses] = useState<
    Record<number, Record<number, boolean>>
  >({});

  const toggleAddress = (sectionIdx: number, addressIdx: number) => {
    setOpenAddresses((prev) => ({
      ...prev,
      [sectionIdx]: {
        ...prev[sectionIdx],
        [addressIdx]: !prev[sectionIdx]?.[addressIdx],
      },
    }));
  };

  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  return (
    <>
      <div id="landing"></div>
      <div dir={t("dir")}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="instructions-dialog-title"
          fullWidth // لجعل النافذة تمتد بعرض الشاشة
          maxWidth="md" // تحديد الحد الأقصى للعرض
          sx={{
            "& .MuiPaper-root": {
              direction: direction,
              borderRadius: "10px",
              backgroundColor: "transparent",
              backdropFilter: "blur(30px)",
              color: "#fff",
            },
          }}
        >
          <DialogTitle id="instructions-dialog-title" sx={{ color: "#3fdb89" }}>
            {t("dialog.title")}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {t("dialog.instructions_intro")}
            </Typography>
            <ul>
              <li style={{ marginBottom: "10px" }}>{t("dialog.step1")}</li>
              <li style={{ marginBottom: "10px" }}>{t("dialog.step2")}</li>
              <li style={{ marginBottom: "10px" }}>{t("dialog.step3")}</li>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#0072367a",
                "&:hover": {
                  backgroundColor: "#007236",
                },
                width: "50%",
                margin: "0 25% 0 25%",
                backdropFilter: "blur(20px)",
              }}
            >
              {t("dialog.close_button")}
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{
            background: " rgba(255, 255, 255, 0.1)",
            color: "#ddd",
            backdropFilter: "blur(8px)",
            width: " 90%",
            margin: "120px auto",
            borderRadius: "14px",
            padding: {
              xs: "16px",
              md: "32px",
            },
          }}
        >
          {i18n.language === "ar" && (
            <>
              {sections.map((section, sectionIdx) => (
                <Box key={sectionIdx} marginBottom={4}>
                  {/* Section Toggle */}
                  <ListItemButton
                    onClick={() => toggleSection(sectionIdx)}
                    sx={{ display: { xs: "block", lg: "flex" } }}
                  >
                    {openSections[sectionIdx] ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText
                      primary={section.title}
                      primaryTypographyProps={{
                        sx: {
                          textAlign: "center",
                          marginTop: "20px",
                          fontSize: "40px",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        maxWidth: { sm: "80%", md: "400px" },
                        height: { sm: "100%", md: "400px" },
                        margin: "auto",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        style={{ width: "100%", borderRadius: "14px" }}
                        loading="lazy"
                      />
                    </Box>
                  </ListItemButton>

                  <Collapse
                    in={openSections[sectionIdx]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {section.addresses.map((address, addressIdx) => (
                      <Box key={addressIdx} marginBottom={2}>
                        <ListItemButton
                          onClick={() => toggleAddress(sectionIdx, addressIdx)}
                          sx={{
                            textAlign: "center",
                            backgroundColor: "#007236",
                            borderRadius: "8px",
                            marginBottom: "10px",
                          }}
                        >
                          <ListItemText
                            primary={address.address}
                            primaryTypographyProps={{
                              sx: {
                                textAlign: "center",
                                fontSize: "20px",
                              },
                            }}
                          />
                          {openAddresses[sectionIdx]?.[addressIdx] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>

                        <Collapse
                          in={openAddresses[sectionIdx]?.[addressIdx]}
                          timeout="auto"
                          unmountOnExit
                        >
                          {/* ✅ جدول للـ Desktop */}
                          <Box sx={{ display: { xs: "none", md: "block" } }}>
                            <TableContainer
                              component={Paper}
                              sx={{ background: "transparent", color: "#ddd" }}
                            >
                              <Table
                                sx={{
                                  background: "transparent",
                                  minWidth: "500px",
                                }}
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      sx={{ color: "#ddd" }}
                                    ></TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        textAlign: "center",
                                        color: "#ddd",
                                        minWidth: "100px",
                                      }}
                                    >
                                      اسم المنتج
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{ color: "#ddd" }}
                                    >
                                      الوزن
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        textAlign: "center",
                                        color: "#ddd",
                                        minWidth: "100px",
                                      }}
                                    >
                                      العدد في الطرد
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        textAlign: "center",
                                        color: "#ddd",
                                      }}
                                    >
                                      باركود الطرد
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        textAlign: "center",
                                        color: "#ddd",
                                        minWidth: "50px",
                                      }}
                                    >
                                      الكمية
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {address.products.map(
                                    (product, productIdx) => (
                                      <TableRow key={productIdx}>
                                        <TableCell
                                          sx={{
                                            borderBottom: "1px solid gray",
                                          }}
                                        >
                                          <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{ width: "100px" }}
                                            loading="lazy"
                                          />
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          sx={{
                                            textAlign: "center",
                                            color: "#ddd",
                                            borderBottom: "1px solid gray",
                                          }}
                                        >
                                          {product.name}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          sx={{
                                            textAlign: "center",
                                            color: "#ddd",
                                            borderBottom: "1px solid gray",
                                          }}
                                        >
                                          {product.pieceWieght}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          sx={{
                                            textAlign: "center",
                                            color: "#ddd",
                                            borderBottom: "1px solid gray",
                                          }}
                                        >
                                          {product.numOf}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          sx={{
                                            textAlign: "center",
                                            color: "#ddd",
                                            borderBottom: "1px solid gray",
                                          }}
                                        >
                                          {product.parcelBarcode}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          sx={{
                                            textAlign: "center",
                                            color: "#ddd",
                                            borderBottom: "1px solid gray",
                                          }}
                                        >
                                          <StyledTextField
                                            type="number"
                                            size="small"
                                            variant="outlined"
                                            inputProps={{ min: 0 }}
                                            placeholder="Qty"
                                            onChange={(e) =>
                                              handleQuantityChange(
                                                section.title,
                                                address.address,
                                                product.name,
                                                parseInt(e.target.value, 10) ||
                                                  0
                                              )
                                            }
                                          />
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                          {/* ✅ كروت للموبايل في Grid */}
                          <Box sx={{ display: { xs: "block", md: "none" } }}>
                            <Grid container spacing={2}>
                              {address.products.map((product, productIdx) => (
                                <Grid item xs={6} key={productIdx}>
                                  <Box
                                    sx={{
                                      background: "#dddddd17",
                                      borderRadius: "12px",
                                      height: "100%",
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                      color: "#ddd",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        textAlign: "center",
                                        marginBottom: 1,
                                      }}
                                    >
                                      <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                          width: "100%",
                                          borderRadius: "8px",
                                          objectFit: "cover",
                                        }}
                                        loading="lazy"
                                      />
                                    </Box>
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        fontSize: "16px",
                                        mb: 1,
                                      }}
                                    >
                                      {product.name}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "13px",
                                        marginBottom: "4px",
                                      }}
                                    >
                                      <strong>الوزن :</strong>{" "}
                                      {product.pieceWieght}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "13px",
                                        marginBottom: "4px",
                                      }}
                                    >
                                      <strong>العدد في الطرد :</strong>
                                      {product.numOf}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "13px",
                                        marginBottom: "4px",
                                      }}
                                    >
                                      <strong>باركود : </strong>
                                      {product.parcelBarcode}
                                    </Typography>
                                    <Box
                                      sx={{
                                        width: "80%",
                                        margin: "auto",
                                        paddingBottom: "10px",
                                      }}
                                    >
                                      <StyledTextField
                                        type="number"
                                        size="small"
                                        variant="outlined"
                                        inputProps={{ min: 0 }}
                                        placeholder="الكمية"
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            section.title,
                                            address.address,
                                            product.name,
                                            parseInt(e.target.value, 10) || 0
                                          )
                                        }
                                        fullWidth
                                      />
                                    </Box>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                  </Collapse>
                </Box>
              ))}
            </>
          )}

          {i18n.language === "en" && (
            <>
              {sections.map((section, sectionIdx) => (
                <Box key={sectionIdx} marginBottom={4}>
                  {/* Section Toggle */}
                  <ListItemButton
                    onClick={() => toggleSection(sectionIdx)}
                    sx={{ display: { xs: "block", lg: "flex" } }}
                  >
                    {" "}
                    {openSections[sectionIdx] ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText
                      primary={section.titleEn}
                      primaryTypographyProps={{
                        sx: {
                          textAlign: "center",
                          marginTop: "20px",
                          fontSize: "40px", // Apply font size here
                        },
                      }}
                    />
                    <Box
                      sx={{
                        maxWidth: {
                          sm: "80%",
                          md: "400px",
                        },
                        height: {
                          sm: "100%",
                          md: "400px",
                        },
                        margin: "auto",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={section.image}
                        alt={section.titleEn}
                        style={{
                          width: "100%",
                          borderRadius: "14px",
                        }}
                        loading="lazy"
                      />
                    </Box>
                  </ListItemButton>
                  <Collapse
                    in={openSections[sectionIdx]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {section.addresses.map((address, addressIdx) => (
                      <Box key={addressIdx} marginBottom={2}>
                        <ListItemButton
                          onClick={() => toggleAddress(sectionIdx, addressIdx)} // Pass both indices
                          sx={{
                            textAlign: "center",
                            backgroundColor: "#007236",
                            borderRadius: "8px",
                            marginBottom: "10px",
                          }}
                        >
                          <ListItemText
                            primary={address.addressEn}
                            primaryTypographyProps={{
                              sx: {
                                textAlign: "center",
                                fontSize: "20px", // Apply font size here
                              },
                            }}
                          />
                          {openAddresses[sectionIdx]?.[addressIdx] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                        <Collapse
                          in={openAddresses[sectionIdx]?.[addressIdx]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <TableContainer
                            component={Paper}
                            sx={{
                              background: "transparent",
                              color: "#ddd",
                            }}
                          >
                            <Table
                              sx={{
                                background: "transparent",
                                minWidth: "500px",
                              }}
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ color: "#ddd" }}></TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{
                                      textAlign: "center",
                                      color: "#ddd",
                                      minWidth: "100px",
                                    }}
                                  >
                                    Product
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{ textAlign: "center", color: "#ddd" }}
                                  >
                                    Weight
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{
                                      textAlign: "center",
                                      color: "#ddd",
                                      minWidth: "100px",
                                    }}
                                  >
                                    The number in the package
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{ textAlign: "center", color: "#ddd" }}
                                  >
                                    Parcode
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{
                                      textAlign: "center",
                                      color: "#ddd",
                                      minWidth: "50px",
                                    }}
                                  >
                                    Quantity
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {address.products.map((product, productIdx) => (
                                  <TableRow key={productIdx}>
                                    <TableCell
                                      sx={{
                                        borderBottom: "1px solid gray",
                                      }}
                                    >
                                      <img
                                        src={product.image}
                                        alt={product.nameEn}
                                        style={{ width: "100px" }}
                                        loading="lazy"
                                      />
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        textAlign: "center",
                                        color: "#ddd",
                                        borderBottom: "1px solid gray",
                                      }}
                                    >
                                      {product.nameEn}
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        textAlign: "center",
                                        color: "#ddd",
                                        borderBottom: "1px solid gray",
                                      }}
                                    >
                                      {product.pieceWieght}
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        textAlign: "center",
                                        color: "#ddd",
                                        borderBottom: "1px solid gray",
                                      }}
                                    >
                                      {product.numOf}
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        textAlign: "center",
                                        color: "#ddd",
                                        borderBottom: "1px solid gray",
                                      }}
                                    >
                                      {product.parcelBarcode}
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        textAlign: "center",
                                        color: "#ddd",
                                        borderBottom: "1px solid gray",
                                      }}
                                    >
                                      <StyledTextField
                                        type="number"
                                        size="small"
                                        variant="outlined"
                                        inputProps={{ min: 0 }}
                                        placeholder="Qty"
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            section.title,
                                            address.address,
                                            product.name,
                                            parseInt(e.target.value, 10) || 0
                                          )
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Collapse>
                      </Box>
                    ))}
                  </Collapse>
                </Box>
              ))}
            </>
          )}

          {/* Modal for reviewing selections */}
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            closeAfterTransition
          >
            <Fade in={openModal}>
              <Box
                sx={{
                  maxHeight: "90vh",
                  overflowY: "auto",
                  position: "absolute",
                  background: " linear-gradient(0deg, #2d6136 -40%, #ccf5b1)",
                  backdropFilter: "blur(12px)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "90%", sm: "600px" },
                  boxShadow: 24,
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#2e7d32",
                    marginBottom: "8px",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#2e7d32", mb: 2 }}
                  >
                    {t("previewTitle")}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="small"
                    onClick={() => setOpenModal(false)}
                  >
                    <Close />
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: {
                      background: "transparent",
                    },
                  }}
                >
                  <Grid container spacing={2}>
                    {selectedProducts.map((item, idx) => {
                      const productDetails = sections
                        .find((section) => section.title === item.section)
                        ?.addresses.find(
                          (address) => address.address === item.address
                        )
                        ?.products.find(
                          (product) => product.name === item.product
                        );

                      const productSize = productDetails?.size || 0;
                      const productWeight = productDetails?.grossWeight || 0;
                      const totalSize = productSize * item.quantity;
                      const totalWeight = productWeight * item.quantity;

                      return (
                        <Grid item xs={6} sm={4} key={idx}>
                          <Card
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              backgroundColor: "transparent",
                              position: "relative",
                              boxShadow: 2,
                              width: {
                                xs: "100%",
                                sm: "150px",
                              },
                            }}
                          >
                            <IconButton
                              size="small"
                              sx={{ position: "absolute", top: 5, right: 5 }}
                              onClick={() =>
                                handleQuantityChange(
                                  item.section,
                                  item.address,
                                  item.product,
                                  0
                                )
                              }
                            >
                              <Delete fontSize="small" color="error" />
                            </IconButton>

                            <Box
                              sx={{
                                mb: 1,
                                borderRadius: 2,
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={productDetails?.image}
                                alt={item.product}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                                loading="lazy"
                              />
                            </Box>

                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "#2e7d32",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {i18n.language === "ar"
                                ? productDetails?.name
                                : productDetails?.nameEn}
                            </Typography>

                            <Typography sx={{ fontSize: "12px" }}>
                              {t("quantity")}: {item.quantity}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              {t("sizePerUnit")}: {productSize}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              {t("grossPerUnit")}: {productWeight}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              {t("totalSize")}: {totalSize.toFixed(2)}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              {t("totalWeight")}: {totalWeight.toFixed(2)}
                            </Typography>

                            <StyledTextField
                              type="number"
                              size="small"
                              fullWidth
                              inputProps={{ min: 0 }}
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.section,
                                  item.address,
                                  item.product,
                                  parseInt(e.target.value, 10) || 0
                                )
                              }
                              sx={{ mt: 1 }}
                            />
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>

                {/* Totals */}
                <Box mt={3}>
                  <Typography variant="h6" sx={{ color: "#000" }}>
                    {t("totalSize")}:{" "}
                    {selectedProducts
                      .reduce((acc, item) => {
                        const size =
                          sections
                            .find((section) => section.title === item.section)
                            ?.addresses.find(
                              (address) => address.address === item.address
                            )
                            ?.products.find(
                              (product) => product.name === item.product
                            )?.size || 0;
                        return acc + size * item.quantity;
                      }, 0)
                      .toFixed(4)}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#000" }}>
                    {t("totalWeight")}:{" "}
                    {selectedProducts
                      .reduce((acc, item) => {
                        const weight =
                          sections
                            .find((section) => section.title === item.section)
                            ?.addresses.find(
                              (address) => address.address === item.address
                            )
                            ?.products.find(
                              (product) => product.name === item.product
                            )?.grossWeight || 0;
                        return acc + weight * item.quantity;
                      }, 0)
                      .toFixed(2)}
                  </Typography>
                </Box>

                {/* Actions */}
                <Box
                  display="flex"
                  justifyContent="center"
                  mt={2}
                  flexWrap="wrap"
                >
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={1}
                  >
                    <Button
                      variant="contained"
                      onClick={handleDownloadExcel}
                      sx={{
                        backgroundColor: "#2e7d32",
                        "&:hover": {
                          backgroundColor: "#1b5e20",
                        },
                      }}
                    >
                      {t("download")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: "25px",
            width: "80%",
            margin: "0 10% 0 10%",
            zIndex: "5",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            sx={{
              backgroundColor: "#0072367a",
              "&:hover": {
                backgroundColor: "#007236",
              },
              width: "50%",
              margin: "0 25% 0 25%",
              backdropFilter: "blur(20px)",
            }}
          >
            {t("preview")}
          </Button>
        </Box>
      </div>
      <EndFooter />
      <Snackbar
        open={alertConfig.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertConfig.severity as AlertProps["severity"]}
          sx={{ width: "100%" }}
        >
          {alertConfig.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Orders;
