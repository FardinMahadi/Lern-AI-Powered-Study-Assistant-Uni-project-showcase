import type { ReactNode } from "react";
import { DashboardLayout } from "@/layouts/dashboard";

export default function DashboardSegmentLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
