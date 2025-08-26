"use client";

import { IconSearch, IconUser } from "@tabler/icons-react";
import style from "./style.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

interface menuItems {
  label: string;
}

const exampleMenu: menuItems[] = [];
for (let i = 0; i < 12; i++) {
  exampleMenu.push({
    label: `label ${i + 1}`,
  });
}

export default function Header() {
  const router = useRouter();
  const { info } = useSelector((state: RootState) => state.user);

  const handleLinkMypage = async () => {
    router.push(!info ? "/login" : "/mypage");
  };

  return (
    <header className={style.header}>
      <h1 className={style.logo}>
        <Link href="/">
          <span>Not 404 Sinema</span>
        </Link>
      </h1>

      <ul className={style["gnb-menu"]}>
        {exampleMenu.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>

      <ul className={style["user-menu"]}>
        <li>
          <button type="button" aria-label="검색">
            <IconSearch />
          </button>
          <div></div>
        </li>
        <li>
          <button
            type="button"
            aria-label="마이페이지"
            onClick={handleLinkMypage}
          >
            <IconUser />
          </button>
        </li>
      </ul>
    </header>
  );
}
