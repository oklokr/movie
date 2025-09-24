"use client";

import Button from "@/components/ui/button";
import style from "./style.module.scss";
import Input from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import Table from "@/components/ui/table";
import { requestGetMovieInfoList } from "@/api/admin";
import { fn_alert } from "@/components/ui/modal/alert";
import Image from "next/image";

interface MovieData {
  movieCode: string;
  movieName: string;
  poster: string;
  price: number;
  discount: number;
  vodState: string;
  reservationState: string;
}

export default function MovieTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const movieName = searchParams.get("movieName") || "";

  const [searchMovieName, setSearchMovieName] = useState<string>("");
  const [movieList, setMovieList] = useState<MovieData[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (searchMovieName) params.set("movieName", searchMovieName);
    else params.delete("movieName");
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const fetchMovieList = (pageNum: number, movieName: string) => {
    setLoading(true);
    requestGetMovieInfoList({
      movieName: movieName,
      page: pageNum,
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setTotal(data.total);
      setMovieList(data.list);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMovieList(page, movieName);
  }, [page, movieName]);

  const handleRegist = (item: MovieData | null) => {
    router.push(
      `movies/regist${item !== null ? "?movieId=" + item.movieCode : ""}`
    );
  };

  const columns = [
    { label: "영화번호", key: "movieCode" },
    { label: "영화명", key: "movieName" },
    {
      label: "포스터",
      key: "poster",
      render: (movie: MovieData) => (
        <div className={style.image}>
          <Image
            src={movie.poster}
            alt={movie.movieName}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ),
    },
    { label: "DVD금액", key: "sales" },
    { label: "DVD할인율", key: "discountrate" },
    { label: "DVD판매 활성화", key: "vodState" },
    { label: "예매 활성화", key: "reservationState" },
    { label: "관람등급", key: "ratingTpcdName" },
  ];

  return (
    <div className={style["movie-table"]}>
      <h2>영화관리</h2>
      <div className={style["search-wrap"]}>
        <Input
          width={374}
          label="영화명"
          placeholder="영화명을 입력하세요"
          orientation="col"
          value={searchMovieName}
          onChange={(e) => setSearchMovieName(e.target.value)}
        />
        <Button
          type="button"
          variant="yellow"
          size="small"
          width={72}
          onClick={handleSearch}
        >
          검색
        </Button>
      </div>

      <div className="table-wrap">
        <div className="total-wrap">
          <span>총 {total.toLocaleString()}개</span>
          <Button
            variant="yellow"
            size="small"
            onClick={() => handleRegist(null)}
          >
            등록
          </Button>
        </div>
        <Table
          columns={columns}
          data={movieList}
          loading={loading}
          rowKey="movieCode"
          onRowClick={(item) => handleRegist(item)}
        />
      </div>
      <Pagination total={total} size={8} />
    </div>
  );
}
