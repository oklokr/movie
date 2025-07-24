import Contnet from "@/components/layout/Content";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <Contnet>{children}</Contnet>
      <Footer />
    </>
  );
}
