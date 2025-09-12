"use client";

import { IconSearch, IconUser } from "@tabler/icons-react";
import style from "./style.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CommonCodeItem } from "@/redux/slices/common";
import { requestLogout } from "@/api/common";
import { fn_alert } from "@/components/ui/modal/alert";
import { resetUserInfo } from "@/redux/slices/user";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface infoType {
  userTpcd: string;
}
interface LayoutState {
  layoutState?: "admin" | "default";
}

export default function Header({ layoutState = "default" }: LayoutState) {
  const router = useRouter();
  const pathname = usePathname();

  const info = useSelector(
    (state: RootState) => state.user.info
  ) as infoType | null;
  const code = useSelector((state: RootState) => state.common.code);
  const dispatch = useDispatch();
  const [genre, setGenre] = useState<CommonCodeItem[][]>([]);

  const [myMenuVisible, setMyMenuVisible] = useState(false);
  const [myMenuState, setMyMenuState] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(code);
    const genreTpcd =
      code?.GENRE_TPCD?.filter((item) => item.commonSubValue === "common") ??
      [];

    const chunked: CommonCodeItem[][] = [];
    for (let i = 0; i < genreTpcd.length; i += 10) {
      chunked.push(genreTpcd.slice(i, i + 10));
    }
    setGenre(chunked);
  }, [code]);

  const handleOpenMyMenu = () => {
    if (!info) return router.push("/login");
    setTimeout(() => setMyMenuVisible(!myMenuVisible), myMenuVisible ? 100 : 0);
    setTimeout(() => setMyMenuState(!myMenuState), !myMenuState ? 100 : 0);
  };

  const handleLogout = () => {
    requestLogout().then((res) => {
      const { code, data } = res;
      if (code !== 200) return fn_alert(data);
      setMyMenuVisible(false);
      dispatch(resetUserInfo());
    });
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        myMenuVisible &&
        menuBtn.current &&
        menuRef.current &&
        !menuBtn.current.contains(e.target as Node) &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setTimeout(() => setMyMenuVisible(false), 100);
        setTimeout(() => setMyMenuState(false), 0);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [myMenuVisible]);

  return (
    <header className={style.header}>
      <h1 className={style.logo}>
        <Link href="/">
          <span>Not 404 Sinema</span>
        </Link>
      </h1>
      {layoutState === "default" && (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={40}
          className={style.swiper}
        >
          {genre?.map((array, idx) => (
            <SwiperSlide key={idx} className={style["swiper-slide"]}>
              {array.map((item) => (
                <button type="button" key={item.commonValue}>
                  {item.commonName}
                </button>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {layoutState === "admin" && (
        <ul className={style["admin-menu"]}>
          <li>
            <Link
              href="/admin/members"
              className={pathname === "/admin/members" ? style.active : ""}
            >
              회원관리
            </Link>
          </li>
          <li>
            <Link
              href="/admin/movies"
              className={pathname === "/admin/movies" ? style.active : ""}
            >
              영화관리
            </Link>
          </li>
          <li>
            <Link
              href="/admin/schedule"
              className={pathname === "/admin/schedule" ? style.active : ""}
            >
              상영관리
            </Link>
          </li>
        </ul>
      )}

      <ul className={style["user-menu"]}>
        {layoutState === "default" && (
          <li>
            <button type="button" aria-label="검색">
              <IconSearch />
            </button>
            <div></div>
          </li>
        )}
        <li>
          <button
            type="button"
            aria-label="마이페이지"
            onClick={handleOpenMyMenu}
            ref={menuBtn}
          >
            <IconUser />
          </button>
          {myMenuVisible && (
            <div
              className={`${style["my-menu"]} ${
                myMenuState ? style.active : ""
              }`}
              ref={menuRef}
            >
              <ul>
                <li>
                  <Link href="/mypage">MY</Link>
                </li>
                <li>나의 DVD</li>
                <li>결제내역</li>
                <li>고객센터</li>
                <li>설정</li>
                {info?.userTpcd === "2" && (
                  <li>
                    <Link href="/admin/members">관리자</Link>
                  </li>
                )}
                <li>
                  <button type="button" onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </header>
  );
}
