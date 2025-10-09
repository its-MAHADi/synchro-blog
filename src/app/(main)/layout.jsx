import Footer from "./components/footer/Footer";
import MessageBar from "./components/MessageBar/MessageBar";
import Navbar from "./components/Navbar/Navbar";
import NextProvider from "@/Provider/NextProvider";

export default function MainLayout({ children }) {
  return (
    <NextProvider>
      <div className="relative min-h-screen">
        {/* Navbar */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <Navbar />
        </header>

        {/* Main Content with Sidebar */}
        <main className="max-w-11/12 mx-auto  py-10 flex  gap-8 items-start">
          {/* বাম পাশে মূল কনটেন্ট */}
          <section className="w-8/12 flex-1">{children}</section>

          {/* ডান পাশে MessageBar */}
          <aside className="w-4/12  sticky top-[90px] overflow-y-auto">
            <MessageBar />
          </aside>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-10">
          <Footer />
        </footer>
      </div>
    </NextProvider>
  );
}
