"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import style from "./banner.module.scss";
import Image from "next/image";
import Button from "@/components/ui/button";
import MovieDetail from "./movieDetail";
import { useState } from "react";

export default function Banner({ list }) {
  if (!list || list.length === 0) return null;
  const [targetMovie, setTargetMovie] = useState();

  return (
    <>
      <section className={style["banner-wrap"]}>
        <Swiper
          navigation={false}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {list.map((item) => (
            <SwiperSlide key={item.movieCode}>
              <span className={style.image}>
                <Image
                  alt={item.movieName}
                  src={item.background}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <p>
                  <strong>{item.movieName}</strong>
                  <span>{item.synopsis}</span>
                  <Button
                    width={120}
                    onClick={() => setTargetMovie(item.movieCode)}
                  >
                    상세보기
                  </Button>
                </p>
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <MovieDetail
        targetMovie={targetMovie}
        onClose={() => setTargetMovie(null)}
      />
    </>
  );
}
