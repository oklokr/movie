"use client";

import Image from "next/image";
import style from "./popularityList.module.scss";
import Button from "@/components/ui/button";
import { useState } from "react";
import MovieDetail from "./movieDetail";

export default function PopularityList({ list }) {
  if (!list || list.length === 0) return null;
  const [targetMovie, setTargetMovie] = useState();

  return (
    <>
      <section className={style["rank-wrap"]}>
        <h3>인기순위</h3>
        <ul>
          {list.map((item, idx) => (
            <li
              key={item.movieCode}
              className={`${style.item} ${style[`item-${idx + 1}`]}`}
            >
              <div className={style.image}>
                <strong>{idx + 1}</strong>
                <Image
                  src={item.poster}
                  alt={item.movieName}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Button onClick={() => setTargetMovie(item.movieCode)}>
                  상세보기
                </Button>
              </div>
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
