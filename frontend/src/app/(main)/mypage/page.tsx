import Tabs from "./components/tabs";
import style from "./style.module.scss";

export default function Mypage() {
  return (
    <div className={style.mypage}>
      <h2>마이페이지</h2>
      <Tabs />
    </div>
  );
}
