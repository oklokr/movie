import style from "./style.module.scss";
import Tabs from "./components/tabs";

export default function MypageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={style.mypage}>
      <h2>마이페이지</h2>
      <Tabs />
      <div className={style["mypage-content"]}>{children}</div>
    </div>
  );
}
