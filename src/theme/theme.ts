import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["cocon-next-arabic", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { minWidth: 0 },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          "&:hover ": {
            backgroundColor: "transparent",
            backdropFilter: "blur(24px)",
            color: "#fff",
          },
        },
      },
    },
  },
});
export default theme;
