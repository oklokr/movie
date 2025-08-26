import style from "./style.module.scss";

export default function Contnet({ children }: { children: React.ReactNode }) {
  return <div className={style.content}>{children}</div>;
}
