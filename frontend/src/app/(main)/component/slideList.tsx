"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import style from "./slide.module.scss";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import Button from "@/components/ui/button";
import MovieDetail from "./movieDetail";
import { useState } from "react";

export default function SlideList({ list }) {
  if (!list || list.length === 0) return null;
  const [targetMovie, setTargetMovie] = useState();

  return (
    <section className={style["slide-wrap"]}>
      <h3>상영중인 영화</h3>
      <Swiper
        navigation
        modules={[Navigation]}
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
          1600: {
            slidesPerView: 6,
          },
        }}
      >
        {list.map((item) => (
          <SwiperSlide key={item.movieCode}>
            <div className={style["movie-item"]}>
              <div className={style.image}>
                {Number(item.discountrate) > 0 && (
                  <strong>{item.discountrate}%</strong>
                )}
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
              <p>{item.movieName}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <MovieDetail
        targetMovie={targetMovie}
        onClose={() => setTargetMovie(null)}
      />
    </section>
  );
}
