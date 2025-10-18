"use client";

import style from "./tab.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Tabs() {
  const pathname = usePathname();

  const tabs = [
    { lable: "회원정보", key: "info" },
    { lable: "DVD 목록", key: "dvd" },
    { lable: "결제내역", key: "payment" },
  ];

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <ul className={style["tab-wrap"]}>
      {tabs.map((item) => (
        <li key={item.key}>
          <Link
            className={pathname === `/mypage/${item.key}` ? style.active : ""}
            href={`/mypage/${item.key}`}
          >
            {item.lable}
          </Link>
        </li>
      ))}
    </ul>
  );
}
