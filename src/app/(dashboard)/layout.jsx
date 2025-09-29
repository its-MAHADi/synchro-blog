"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AdminSidebar from "../(main)/components/AdminSidebar/AdminSidebar";
import UserSidebar from "../(main)/components/UserSidebar/UserSidebar";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email) {
    const res = await fetch(`/api/user?email=${session?.user?.email}`);
      if (res.ok) {
      const data = await res.json();
  setUserData(data);
       }
      }
    };
    fetchUser();
  }, [session]);
  //  console.log(userData)
  return (
    <div className="md:flex min-h-screen">
      {userData?.userRole === "admin" ? <AdminSidebar /> : <UserSidebar />}
      <div className="flex-1 bg-gray-50">
        <main className="flex-1 p-6 h-screen overflow-y-auto max-w-[90%] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}