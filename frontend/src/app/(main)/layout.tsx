import Content from "@/components/layout/content/Content";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
