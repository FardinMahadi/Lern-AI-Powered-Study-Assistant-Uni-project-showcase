import type { ReactNode } from "react";

import { DashboardLayout } from "@/components/layout";

export default function DashboardSegmentLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
