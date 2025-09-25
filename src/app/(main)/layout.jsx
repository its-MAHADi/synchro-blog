import { SessionProvider } from "next-auth/react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import NextProvider from "@/Provider/NextProvider";



export default function MainLayout({ children }) {
  return (
    <NextProvider>
      <div className="space-y-20">
        <header>
          {/* nav bar */}
          <Navbar />
        </header>
        <main className="min-h-[calc(100vh-434px)]">{children}</main>
        {/* footer */}
        <Footer />
      </div>
    </NextProvider>
  );
}
