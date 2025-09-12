import Link from "next/link";
import LoginForm from "./component/loginForm";
import style from "../stlye.module.scss";
import Header from "@/components/layout/header/Header";
import Contnet from "@/components/layout/content/Content";
import Footer from "@/components/layout/footer/Footer";

export default function LoginPage() {
  return (
    <>
      <Header />
      <Contnet>
        <div className={style["login-wrap"]}>
          <h1 className={style.logo}>
            <Link href="/">Not404 Cinema</Link>
          </h1>
          <LoginForm />
        </div>
      </Contnet>
      <Footer />
    </>
  );
}
