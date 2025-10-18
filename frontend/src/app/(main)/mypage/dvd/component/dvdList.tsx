"use client";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { requestgetVodList } from "@/api/user";
import { fn_alert } from "@/components/ui/modal/alert";
import Image from "next/image";
import PopView from "./popView";

export default function DvdList() {
  const userInfo = useSelector((state: RootState) => state.user.info);
  const [vodList, setVodList] = useState();
  const [viweMovieCode, setViewMovieCoed] = useState("");

  useEffect(() => {
    requestgetVodList({
      userId: userInfo?.userId,
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setVodList(data);
    });
  }, [userInfo?.userId]);

  useEffect(() => {
    console.log(vodList);
  }, [vodList]);

  return (
    <>
      <ul className={style["dvd-wrap"]}>
        {vodList &&
          vodList.map((item) => (
            <li key={item.movieCode}>
              <div className={style.image}>
                <Image
                  src={item.background || "/images/fallback.png"}
                  alt={item.movieName || "No image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <p>
                <span className={style.tag}>
                  {item.genreA && <span>{item.genreA}</span>}
                  {item.genreB && <span>{item.genreB}</span>}
                  {item.genreC && <span>{item.genreC}</span>}
                </span>
                <strong>{item.movieName}</strong>
                <span>{item.runtime}분</span>
              </p>
              {item.teaser && (
                <button
                  className={style["btn-view"]}
                  onClick={() => setViewMovieCoed(item.teaser)}
                >
                  시청하기
                </button>
              )}
            </li>
          ))}
      </ul>
      <PopView link={viweMovieCode} onClose={() => setViewMovieCoed("")} />
    </>
  );
}
