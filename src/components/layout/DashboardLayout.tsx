"use client";

import Link from "next/link";
import { useColorMode } from "@/theme";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Divider,
  Drawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { dashboardNavItems } from "./navConfig";

import type {
  DashboardLayoutContextValue,
  DashboardLayoutProps,
  SidebarContentProps,
} from "./types";

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 88;

const DashboardLayoutContext = createContext<DashboardLayoutContextValue | undefined>(undefined);

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { mode, toggleColorMode } = useColorMode();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const breadcrumbItems = useMemo(() => {
    if (!pathname) return [];
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href,
      };
    });
  }, [pathname]);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleCollapseToggle = () => setCollapsed((prev) => !prev);
  const showSidebar = useCallback(() => setSidebarVisible(true), []);
  const hideSidebar = useCallback(() => setSidebarVisible(false), []);

  const desktopWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;
  const navWidth = sidebarVisible ? desktopWidth : 0;

  const contextValue = useMemo<DashboardLayoutContextValue>(
    () => ({
      sidebarVisible,
      collapsed,
      showSidebar,
      hideSidebar,
      setCollapsed,
    }),
    [sidebarVisible, collapsed, showSidebar, hideSidebar, setCollapsed]
  );

  return (
    <DashboardLayoutContext.Provider value={contextValue}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {sidebarVisible && (
          <Box
            component="nav"
            sx={{
              width: { md: navWidth },
              flexShrink: { md: 0 },
            }}
            aria-label="sidebar navigation"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: DRAWER_WIDTH,
                  borderRight: "none",
                },
              }}
            >
              <SidebarContent
                pathname={pathname}
                collapsed={false}
                onCollapseToggle={handleCollapseToggle}
                showCollapseToggle={false}
                onNavigate={handleDrawerToggle}
              />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: navWidth,
                  borderRight: "none",
                },
              }}
              open
            >
              <SidebarContent
                pathname={pathname}
                collapsed={collapsed}
                onCollapseToggle={handleCollapseToggle}
                showCollapseToggle
              />
            </Drawer>
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: sidebarVisible ? `calc(100% - ${navWidth}px)` : "100%" },
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <AppBar
            position="fixed"
            sx={{
              width: { md: sidebarVisible ? `calc(100% - ${navWidth}px)` : "100%" },
              ml: { md: sidebarVisible ? `${navWidth}px` : 0 },
              backdropFilter: "blur(18px)",
              backgroundColor: "transparent",
            }}
          >
            <Toolbar
              sx={{
                px: { xs: 2, md: 3 },
                py: 1,
                minHeight: 60,
              }}
            >
              <Stack direction="row" spacing={1.25} alignItems="center">
                {sidebarVisible ? (
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ display: { md: "none" } }}
                  >
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={showSidebar}
                    sx={{ display: { md: "none" } }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}

                <HomeIcon fontSize="small" sx={{ display: { xs: "none", md: "inline-flex" } }} />
                <Breadcrumbs
                  aria-label="breadcrumb"
                  sx={{ color: "text.secondary", fontSize: "0.85rem" }}
                >
                  <MuiLink
                    component={Link}
                    href="/"
                    underline="hover"
                    color="inherit"
                    sx={{ fontSize: "0.85rem" }}
                  >
                    Home
                  </MuiLink>
                  {breadcrumbItems.map((crumb, index) => (
                    <MuiLink
                      key={crumb.href}
                      component={Link}
                      color={index === breadcrumbItems.length - 1 ? "text.primary" : "inherit"}
                      href={crumb.href}
                      underline={index === breadcrumbItems.length - 1 ? "none" : "hover"}
                      sx={{ fontSize: "0.85rem" }}
                    >
                      {crumb.label}
                    </MuiLink>
                  ))}
                </Breadcrumbs>
              </Stack>

              <Stack direction="row" spacing={0.75} alignItems="center" sx={{ ml: "auto" }}>
                <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
                  <IconButton onClick={toggleColorMode} color="inherit" size="small">
                    {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                  </IconButton>
                </Tooltip>
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "0.85rem" }}
                >
                  L
                </Avatar>
                <Tooltip title="Sign out">
                  <IconButton color="inherit" size="small">
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Toolbar>
          </AppBar>

          <Toolbar sx={{ mb: 3 }} />
          <Box
            component="section"
            sx={{
              px: { xs: 2.5, sm: 3, md: 6 },
              pb: 6,
              flexGrow: 1,
              height: "100%",
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </DashboardLayoutContext.Provider>
  );
}
function SidebarContent({
  pathname,
  collapsed,
  onCollapseToggle,
  showCollapseToggle,
  onNavigate,
}: SidebarContentProps) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        px: collapsed ? 1 : 1.75,
        py: 2.5,
        alignItems: collapsed ? "center" : "stretch",
      }}
    >
      <Stack
        direction={collapsed ? "column" : "row"}
        alignItems="center"
        justifyContent={showCollapseToggle ? (collapsed ? "center" : "space-between") : "center"}
        spacing={collapsed ? 1 : 2}
        sx={{ width: "100%" }}
      >
        {!collapsed && (
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ letterSpacing: "-0.01em", fontSize: "1.1rem" }}
          >
            Lern
          </Typography>
        )}
        {showCollapseToggle && (
          <IconButton
            size="small"
            onClick={onCollapseToggle}
            sx={{
              borderRadius: 2,
              bgcolor: "action.hover",
              "&:hover": { bgcolor: "action.selected" },
            }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Stack>

      <List sx={{ flexGrow: 1, width: "100%" }}>
        {dashboardNavItems.map((item) => {
          const isActive =
            pathname === item.path || (pathname?.startsWith(item.path) && item.path !== "/");

          return (
            <ListItemButton
              key={item.title}
              component={Link}
              href={item.path}
              selected={Boolean(isActive)}
              onClick={onNavigate}
              sx={{
                mb: 0.75,
                borderRadius: 2,
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 1.25 : 1.75,
                py: collapsed ? 1 : 1.1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 0 : 40,
                  mr: collapsed ? 0 : 1.5,
                  color: isActive ? "primary.main" : "text.secondary",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.95rem",
                    letterSpacing: "0.01em",
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {!collapsed && showCollapseToggle && (
        <>
          <Divider />
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Stay curious. Keep learning.
          </Typography>
        </>
      )}
    </Box>
  );
}

export function useDashboardLayout(): DashboardLayoutContextValue {
  const context = useContext(DashboardLayoutContext);
  if (!context) {
    throw new Error("useDashboardLayout must be used within DashboardLayout");
  }
  return context;
}
