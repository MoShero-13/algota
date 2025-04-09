import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Fab,
  Fade,
  MenuItem,
  Slide,
  styled,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.webp";
import logo1 from "../../assets/logo1.webp";
import { HashLink as Link } from "react-router-hash-link";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { WhatsApp } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  backgroundColor: "#0072367a",
  border: "1px solid",
  borderColor: theme.palette.divider,
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

/* -------------------------------------------------------------------------- */
/*                                Hide App Bar                                */
/* -------------------------------------------------------------------------- */
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Scroll to top                               */
/* -------------------------------------------------------------------------- */
function ScrollTop(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#landing");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 20, left: 16, zIndex: "100" }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function NavBar(props: Props) {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();

  /* -------------------------------------------------------------------------- */
  /*                                   Drawer                                   */
  /* -------------------------------------------------------------------------- */
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          enableColorOnDark
          sx={{
            boxShadow: 0,
            bgcolor: "transparent",
            backgroundImage: "none",
            mt: "calc(var(--template-frame-height, 0px) + 28px)",
          }}
        >
          <Container maxWidth="lg">
            <div dir={t("dir")}>
              <StyledToolbar variant="dense" disableGutters>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                    px: 0,
                  }}
                >
                  <Box>
                    {i18n.language === "en" && (
                      <Link to="">
                        <img
                          src={logo1}
                          alt="logo"
                          style={{
                            position: "absolute",
                            top: "-30px",
                            width: "130px",
                          }}
                        />
                      </Link>
                    )}
                    {i18n.language === "ar" && (
                      <Link to="">
                        <img
                          src={logo}
                          alt="logo1"
                          style={{
                            position: "absolute",
                            top: "-30px",
                            width: "130px",
                          }}
                        />
                      </Link>
                    )}
                  </Box>
                  <Box sx={{ display: { xs: "none", lg: "flex" } }}>
                    <Link to="/#">
                      <Button
                        variant="text"
                        style={{ color: "white", fontSize: "18px" }}
                      >
                        {t("homepage")}
                      </Button>
                    </Link>
                    <Link to="/aboutUs#landing">
                      <Button
                        variant="text"
                        style={{ color: "white", fontSize: "18px" }}
                      >
                        {t("about")}
                      </Button>
                    </Link>
                    <Link to="/#products">
                      <Button
                        variant="text"
                        style={{ color: "white", fontSize: "18px" }}
                      >
                        {t("productTitle")}
                      </Button>
                    </Link>
                    <Link to="/#place">
                      <Button
                        variant="text"
                        style={{ color: "white", fontSize: "18px" }}
                      >
                        {t("places")}
                      </Button>
                    </Link>
                    <Link to="/#events">
                      <Button
                        variant="text"
                        style={{ color: "white", fontSize: "18px" }}
                      >
                        {t("news-h2")}
                      </Button>
                    </Link>
                    <Link to="/#news">
                      <Button
                        variant="text"
                        color="info"
                        style={{ color: "white", fontSize: "18px" }}
                      >
                        {t("ournews")}
                      </Button>
                    </Link>
                    <Link to="/#contact">
                      <Button
                        variant="text"
                        color="info"
                        style={{ color: "white", fontSize: "18px" }}
                      >
                        {t("contact")}
                      </Button>
                    </Link>
                  </Box>
                </Box>

                <Box sx={{ display: { md: "flex", lg: "none" }, gap: 1 }}>
                  <IconButton
                    aria-label="Menu button"
                    onClick={toggleDrawer(true)}
                  >
                    <MenuIcon style={{ color: "#ddd" }} />
                  </IconButton>
                  <Drawer
                    anchor="top"
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                      sx: {
                        top: "var(--template-frame-height, 0px)",
                        backgroundColor: "transparent",
                        backdropFilter: "blur(24px)",
                        color: "#ddd",
                      },
                    }}
                  >
                    <div dir={t("dir")}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "transparent",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton onClick={toggleDrawer(false)}>
                            <CloseIcon style={{ color: "#ddd" }} />
                          </IconButton>
                        </Box>
                        <Link to="/#" onClick={toggleDrawer(false)}>
                          <MenuItem sx={{ fontSize: "20px" }}>
                            {t("homepage")}
                          </MenuItem>
                        </Link>
                        <Link
                          to="/aboutUs#landing"
                          onClick={toggleDrawer(false)}
                        >
                          <MenuItem sx={{ fontSize: "20px" }}>
                            {t("about")}
                          </MenuItem>
                        </Link>
                        <Link to="/#products" onClick={toggleDrawer(false)}>
                          <MenuItem sx={{ fontSize: "20px" }}>
                            {t("productTitle")}
                          </MenuItem>
                        </Link>
                        <Link to="/#place" onClick={toggleDrawer(false)}>
                          <MenuItem sx={{ fontSize: "20px" }}>
                            {t("places")}
                          </MenuItem>
                        </Link>
                        <Link to="/#events" onClick={toggleDrawer(false)}>
                          <MenuItem sx={{ fontSize: "20px" }}>
                            {t("news-h2")}
                          </MenuItem>
                        </Link>
                        <Link to="/#news" onClick={toggleDrawer(false)}>
                          <MenuItem sx={{ fontSize: "20px" }}>
                            {t("ournews")}
                          </MenuItem>
                        </Link>
                        <Divider sx={{ my: 3 }} />
                        <Link to="/#contact" onClick={toggleDrawer(false)}>
                          <MenuItem>
                            <Button
                              variant="contained"
                              fullWidth
                              style={{
                                backgroundColor: "#007236",
                                fontSize: "20px",
                              }}
                            >
                              {t("forContact")}
                            </Button>
                          </MenuItem>
                        </Link>
                      </Box>
                    </div>
                  </Drawer>
                </Box>
                {i18n.language === "ar" && (
                  <Button
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}
                    variant="outlined"
                    sx={{
                      color: "#ddd",
                      borderColor: "transparent",
                      "&:hover": { borderColor: "#ddd" },
                    }}
                  >
                    En
                  </Button>
                )}
                {i18n.language === "en" && (
                  <Button
                    onClick={() => {
                      i18n.changeLanguage("ar");
                    }}
                    variant="outlined"
                    sx={{
                      color: "#ddd",
                      borderColor: "transparent",
                      "&:hover": { borderColor: "#ddd" },
                    }}
                  >
                    Ar
                  </Button>
                )}
                <Link to="/orders#landing">
                  <Button
                    variant="text"
                    color="info"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    <ShoppingCartOutlinedIcon sx={{ color: "#EC1F27" }} />
                  </Button>
                </Link>
              </StyledToolbar>
            </div>
          </Container>
        </AppBar>
      </HideOnScroll>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top" className="fab">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <a href="https://wa.me/+963991199453" target="_blank">
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 16,
            zIndex: "100",
          }}
        >
          <Fab
            size="medium"
            aria-label="scroll back to top"
            sx={{ backgroundColor: "#25D366", color: "#fff" }}
          >
            <WhatsApp />
          </Fab>
        </Box>
      </a>
    </>
  );
}

export default NavBar;
