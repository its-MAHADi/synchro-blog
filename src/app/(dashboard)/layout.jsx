import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export const metadata = {
  title: "Dashboard | Synchro CMS",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 md:ml-64">
        <Topbar />
        <main className="p-4 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
