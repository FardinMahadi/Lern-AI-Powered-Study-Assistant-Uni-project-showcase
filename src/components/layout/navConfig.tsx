import { ReactNode } from "react";
import { ROUTES } from "@/lib/constants";
import NoteAltIcon from "@mui/icons-material/NoteAltOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubbleOutline";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

export interface DashboardNavItem {
  title: string;
  path: string;
  icon: ReactNode;
}

export const dashboardNavItems: DashboardNavItem[] = [
  {
    title: "Overview",
    path: ROUTES.OVERVIEW,
    icon: <SpaceDashboardIcon fontSize="small" />,
  },
  {
    title: "Chat",
    path: ROUTES.CHAT,
    icon: <ChatBubbleIcon fontSize="small" />,
  },
  {
    title: "Notes",
    path: ROUTES.NOTES,
    icon: <NoteAltIcon fontSize="small" />,
  },
  {
    title: "Settings",
    path: ROUTES.SETTINGS,
    icon: <SettingsIcon fontSize="small" />,
  },
];
