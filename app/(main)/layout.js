import Nav from "@/app/(main)/components/nav";
import Footer from "@/app/(main)/components/Footer";

export default function MainLayout({ children }) {
  return (
    <main className="max-w-screen">
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
