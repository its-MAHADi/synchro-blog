// app/(dashboard)/layout.jsx
// import UserSidebar from "@/components/dashboard/UserSidebar";
// import AdminSidebar from "@/components/dashboard/AdminSidebar";

import { cookies } from "next/headers";
import Navbar from "../(main)/components/Navbar/Navbar";

export default function DashboardLayout({ children }) {
  const role = cookies().get("role")?.value;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {/* {role === "admin" ? <AdminSidebar /> : <UserSidebar />} */}

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
