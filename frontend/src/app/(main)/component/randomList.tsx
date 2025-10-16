"use client";

import Image from "next/image";
import style from "./randomList.module.scss";
import Button from "@/components/ui/button";
import MovieDetail from "./movieDetail";
import { useState } from "react";

export default function RandomList({ list }) {
  if (!list || list.length === 0) return null;
  const [targetMovie, setTargetMovie] = useState();

  return (
    <>
      <section className={style["random-wrap"]}>
        <h3>이런 영화도 있어요</h3>
        <ul>
          {list.map((item) => (
            <li key={item.movieCode}>
              <span className={style.image}>
                <Image
                  src={item.poster || "/images/fallback.png"} // poster 없으면 기본 이미지
                  alt={item.movieName || "No image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Button onClick={() => setTargetMovie(item.movieCode)}>
                  상세보기
                </Button>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <MovieDetail
        targetMovie={targetMovie}
        onClose={() => setTargetMovie(null)}
      />
    </>
  );
}
