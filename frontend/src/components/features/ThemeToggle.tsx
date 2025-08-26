// ThemeToggle.tsx
"use client";

import { useState, useEffect } from "react";
import style from "./style.module.scss";
import {
  IconBrightnessDown,
  IconBrightnessDownFilled,
} from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const router = useRouter();

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    console.log(router);
  }, [router]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      className={`${style["theme-toggle-btn"]} ${style[theme]}`}
      onClick={toggleTheme}
      aria-label={`현재 테마: ${theme}`}
    >
      {theme === "dark" ? (
        <IconBrightnessDown stroke={1} size={40} />
      ) : (
        <IconBrightnessDownFilled size={40} />
      )}
    </button>
  );
}
