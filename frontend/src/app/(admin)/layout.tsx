import Content from "@/components/layout/content/Content";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header layoutState="admin" />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
