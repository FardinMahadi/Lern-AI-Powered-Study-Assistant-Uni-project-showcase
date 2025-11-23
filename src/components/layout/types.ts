import { ReactNode } from 'react';

export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface SidebarContentProps {
  pathname: string | null;
  collapsed: boolean;
  onCollapseToggle: () => void;
  showCollapseToggle: boolean;
  onNavigate?: () => void;
}

export interface DashboardLayoutContextValue {
  sidebarVisible: boolean;
  collapsed: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapse?: () => void;
}
