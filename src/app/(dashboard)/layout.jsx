// app/(dashboard)/layout.jsx

import { cookies } from "next/headers";
import AdminSidebar from "../(main)/components/AdminSidebar/AdminSidebar";
import UserSidebar from "../(main)/components/UserSidebar/UserSidebar";

export default function DashboardLayout({ children }) {
  // role কুকি থেকে নেওয়া হলো
  const role = cookies().get("role")?.value || "user";

  return (
    <div className="md:flex min-h-screen">
      {/* Sidebar */}
      {role === "admin" ? <AdminSidebar /> : <UserSidebar />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* যদি আলাদা Navbar দরকার হয়, এখানে বসাতে পারো */}
        {/* <Navbar /> */}
        <main className="flex-1 p-6 max-w-[90%] mx-auto">{children}</main>
      </div>
    </div>
  );
}
