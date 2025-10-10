// DashboardLayout.jsx (Server Component)
import { cookies } from "next/headers";
import AdminSidebar from "../(main)/components/AdminSidebar/AdminSidebar";
import DashboardContent from "./DashboardContent"; // client component

export default function DashboardLayout({ children }) {
  const role = cookies().get("role")?.value || "user";

  return (
    <div className="md:flex min-h-screen">
      {role === "admin" && <AdminSidebar />}
      <DashboardContent role={role}>{children}</DashboardContent>
    </div>
  );
}
