"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1>
        <Link href="/">Not 404 Sinema</Link>
      </h1>

      <ul>
        <li>
          <button>검색</button>
        </li>
        <li>
          <button>마이페이지</button>
        </li>
      </ul>
    </header>
  );
}
