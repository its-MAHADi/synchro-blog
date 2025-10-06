// app/(dashboard)/layout.jsx

import { cookies } from "next/headers";
import AdminSidebar from "../(main)/components/AdminSidebar/AdminSidebar";
import UserSidebar from "../(main)/components/UserSidebar/UserSidebar";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  // role কুকি থেকে নেওয়া হলো
  const role = cookies().get("role")?.value || "user";

  return (
    <>
      <div className="md:flex min-h-screen">
        {/* Sidebar /}
        {role === "admin" ? <AdminSidebar /> : <UserSidebar />}


        {/ Main Content */}
        <div className="flex-1  bg-gray-50">
            <div className="my-5 mx-5 ml-260">
              <Link href="/" className="btn border-[#c45627] text-[#c45627] text-xl font-bold hover:bg-[#c45627] hover:text-white rounded-sm">Home</Link>
            </div>
          <main className="flex-1 p-6 h-screen overflow-x-auto max-w-[90%] mx-auto">{children}</main>
        </div>
      </div>

    </>
  );
}