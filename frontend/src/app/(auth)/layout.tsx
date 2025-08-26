import style from "./stlye.module.scss";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={style.auth}>{children}</div>;
}
