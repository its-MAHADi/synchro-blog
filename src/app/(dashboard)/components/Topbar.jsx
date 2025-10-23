"use client";
import { useMessage } from "@/app/contexts/MessageContext";
import { Search } from "lucide-react";
import { IoNotificationsOutline } from "react-icons/io5";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Topbar() {
    const { data: session, status } = useSession();

    // const { toggleMessageBar, tog
    // gleNotificationBar, showMessageBar, showNotificationBar } = useMessage();

    return (
        <header className="flex justify-between items-center p-4 bg-white border-[#0000ff1a] border-b shadow-sm sticky top-0 z-20">
            {/* Left: Search */}
            <div className="flex items-center gap-4 flex-1 max-w-md">
                {/* <div className="relative w-full text-gray-400">
                    <Search className="absolute top-1/2 left-3 -translate-y-1/2" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div> */}
            </div>

            {/* Right: Notifications + Avatar */}
            <div className="flex items-center gap-4 ml-4">
                <p className="font-semibold text-lg">
                    Name
                </p>

                {/* User avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                        src="/defult_profile.jpg"
                        alt="User"
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
            </div>
        </header>
    );
}
