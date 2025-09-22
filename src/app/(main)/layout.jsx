import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";


export const metadata = {
  title: "Home | Synchro",
  description: "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence. Traditional blogging often requires significant effort in research, writing, editing, SEO optimization, and audience engagement.",
};

export default function MainLayout({ children }) {
  return <>
    <div className="space-y-20">
      <header>
        {/* nav bar */}
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-434px)]">
        {children}
      </main>
      {/* footer */}
      <Footer />
    </div>
  </>;
}
