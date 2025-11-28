import Nav from "./ui/nav";
import Footer from "./ui/Footer";

export default function MainLayout({ children }) {
  return (
    <main className="max-w-screen">
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
