import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Chip,
  useScrollTrigger,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const CTA = () => (
  <Button
    variant="contained"
    color="primary"
    sx={{
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.95rem",
      px: 2.5,
      py: 1,
      borderRadius: 2.5,
    }}
  >
    Get Started
  </Button>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const isLight = theme.palette.mode === "light";

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Chat", href: "/chat" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <IconButton onClick={handleDrawerToggle} aria-label="close menu">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component="a"
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{
                py: 1,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.text.primary, isLight ? 0.08 : 0.08),
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <CTA />
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: trigger
            ? alpha(theme.palette.background.default, isLight ? 0.8 : 0.5)
            : alpha(theme.palette.background.default, isLight ? 0.95 : 0.8),
          backdropFilter: trigger ? "blur(10px)" : undefined,
          border: trigger ? `1px solid ${alpha(theme.palette.primary.main, 0.5)}` : "none",
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, isLight ? 0.2 : 0.5)}`,
          borderRadius: trigger ? "14px" : "0",
          maxWidth: trigger ? "calc(100% - 32px)" : "100%",
          top: trigger ? "8px" : 0,
          left: trigger ? "16px" : "0",
          right: trigger ? "16px" : "0",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: 64, md: 68 },
              gap: { xs: 2, md: 0 },
            }}
          >
            {/* Logo and Brand */}
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  "& img": {
                    transform: "scale(1.1)",
                  },
                  "& .brand-name": {
                    color: alpha(theme.palette.text.primary, 0.7),
                  },
                },
              }}
            >
              <Box
                component="img"
                src="/images/logo.png"
                alt="Lern Logo"
                sx={{
                  height: 32,
                  width: 32,
                  transition: "transform 0.3s ease",
                }}
              />
              <Box
                component="span"
                className="brand-name"
                sx={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  transition: "color 0.2s ease",
                  letterSpacing: "-0.02em",
                }}
              >
                Lern
              </Box>
              <Chip
                label="Beta"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  backgroundColor: alpha(theme.palette.secondary.main, isLight ? 0.15 : 0.1),
                  color: theme.palette.secondary.light,
                  border: `1px solid ${alpha(theme.palette.secondary.light, isLight ? 0.4 : 0.6)}`,
                  boxShadow: `0 0 8px ${alpha(theme.palette.secondary.light, isLight ? 0.15 : 0.2)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: theme.palette.secondary.light,
                    backgroundColor: alpha(theme.palette.secondary.main, isLight ? 0.2 : 0.15),
                  },
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    href={item.href}
                    sx={{
                      color: alpha(theme.palette.text.primary, 0.7),
                      textTransform: "none",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                      px: 1,
                      py: 0.5,
                      "&:hover": {
                        color: alpha(theme.palette.text.primary, 0.9),
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* CTA and Mobile Menu Button */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {!isMobile && <CTA />}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open menu"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
