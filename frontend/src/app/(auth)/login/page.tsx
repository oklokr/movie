import Link from "next/link";
import LoginForm from "./component/loginForm";
import style from "../stlye.module.scss";

export default function LoginPage() {
  return (
    <div className={style["login-wrap"]}>
      <h1 className={style.logo}>
        <Link href="/">Not404 Cinema</Link>
      </h1>
      <LoginForm />
    </div>
  );
}
