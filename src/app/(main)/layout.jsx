import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import NextProvider from "@/Provider/NextProvider";

export const metadata = {
  title: "Home | Synchro",
  description:
    "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence.",
};


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
