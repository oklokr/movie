import Contnet from "@/components/layout/content/Content";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import style from "./stlye.module.scss";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${style.app} dark`}>
      <Header />
      <Contnet>{children}</Contnet>
      <Footer />
    </div>
  );
}
