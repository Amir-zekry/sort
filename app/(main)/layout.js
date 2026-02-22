import Nav from "@/app/(main)/components/nav";
import Footer from "@/app/(main)/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}