import DashboardShell from "@/components/dashboard-shell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
