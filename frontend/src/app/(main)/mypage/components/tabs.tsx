"use client";

import { useState } from "react";
import Info from "./info";
import Dvd from "./dvd";
import Payment from "./pyment";
import style from "./tab.module.scss";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { lable: "회원정보", key: "info", content: <Info /> },
    { lable: "DVD 목록", key: "dvd", content: <Dvd /> },
    { lable: "결제내역", key: "payment", content: <Payment /> },
  ];

  return (
    <div className={style["mypage-wrap"]}>
      <ul className={style["tab-wrap"]}>
        {tabs.map((item) => (
          <li key={item.key}>
            <button
              className={item.key === activeTab ? style.active : ""}
              onClick={() => setActiveTab(item.key)}
            >
              {item.lable}
            </button>
          </li>
        ))}
      </ul>
      <div className={style["mypage-item"]}>
        {tabs.map((item) => item.key === activeTab && item.content)}
      </div>
    </div>
  );
}
