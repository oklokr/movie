import style from "./style.module.scss";
export default function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style["company-desc"]}>© 2025 Not 404 Sinema, Inc</p>
      <p className={style.desc}>
        <span>
          서비스 제공자: Not404 | 사업자등록번호: 000-00-00000 | 대표 이메일:
          contact@not404.com
        </span>
        <span>
          통신판매업 신고번호: 제2025-서울강남-0000호 | 대표전화: 02-0000-0000
        </span>
        <span>호스팅 서비스: Amazon Web Services</span>
        <span>
          Not404는 콘텐츠 유통 플랫폼으로, 실제 상영 또는 제공 서비스의 책임은
          각 콘텐츠 제공자에게 있습니다.
        </span>
      </p>
    </footer>
  );
}
