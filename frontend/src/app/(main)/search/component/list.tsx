"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { requestGetMovieList } from "@/api/main";
import { fn_alert } from "@/components/ui/modal/alert";
import Button from "@/components/ui/button";
import MovieDetail from "../../component/movieDetail";
import style from "./style.module.scss";

export default function List() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const genreTpcd = searchParams.get("genreTpcd") || "";

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [movieList, setMovieList] = useState([]);
  const [targetMovie, setTargetMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

  const fetchMovies = useCallback(
    async (pageNum, isReset = false) => {
      if (loading) return;

      setLoading(true);
      try {
        const res = await requestGetMovieList({
          genreTpcd,
          keyword,
          page: pageNum,
        });
        const { code, data, msg } = res;

        if (code !== 200) {
          fn_alert(msg || "영화 목록을 불러오는 중 오류가 발생했습니다.");
          return;
        }

        setTotal(data.total);

        setMovieList((prev) => {
          const newList = isReset ? data.list : [...prev, ...data.list];
          setHasMore(newList.length < data.total);
          return newList;
        });
      } catch (e) {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [genreTpcd, keyword]
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setMovieList([]);
    fetchMovies(1, true);
  }, [keyword, genreTpcd, fetchMovies]);

  useEffect(() => {
    if (page === 1) return;
    fetchMovies(page);
  }, [page, fetchMovies]);

  const lastMovieRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasMore, loading]
  );

  const handleOpenDetail = (movie) => setTargetMovie(movie);
  const handleCloseDetail = () => setTargetMovie(null);

  return (
    <>
      <div className={style["search-wrap"]}>
        {keyword && (
          <h3>
            “{keyword}” 검색 결과 총 {total}개
          </h3>
        )}

        <ul className={style["movie-wrap"]}>
          {movieList.map((item, idx) => {
            const isLast = idx === movieList.length - 1;
            return (
              <li
                key={item.movieCode}
                ref={isLast ? lastMovieRef : null}
                className={style["movie-item"]}
              >
                <div className={style.image}>
                  {Number(item.discountrate) > 0 && (
                    <strong className={style.discount}>
                      {item.discountrate}%
                    </strong>
                  )}
                  <Image
                    src={item.poster || "/images/fallback.png"}
                    alt={item.movieName || "No image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    style={{ objectFit: "cover" }}
                  />
                  <Button onClick={() => handleOpenDetail(item.movieCode)}>
                    상세보기
                  </Button>
                </div>
                <p className={style.title}>{item.movieName}</p>
              </li>
            );
          })}
        </ul>

        {/* {loading && <p className={style.loading}>불러오는 중...</p>} */}
        {/* {!hasMore && !loading && (
          <p className={style.end}>모든 영화를 불러왔습니다.</p>
        )} */}
      </div>

      {targetMovie && (
        <MovieDetail targetMovie={targetMovie} onClose={handleCloseDetail} />
      )}
    </>
  );
}
