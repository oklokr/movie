"use client";

import DatePickerField from "@/components/ui/datePicker";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import {
  requestGetMovieInfoList,
  requestGetTheater,
  requestInsertRunSchedule,
  requestInsertTheater,
} from "@/api/admin";
import { fn_alert, fn_confirm } from "@/components/ui/modal/alert";
import dayjs from "dayjs";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/input";
import Table from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";

const times = [
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];

interface TheaterList {
  theaterCode: string;
  theaterName: string;
  schedules: [
    {
      startTime: string;
      endTime: string;
    }
  ];
}

interface PostForm {
  theaterCode: string;
  runDate: Date | null;
  startTime: string;
  endTime: string;
  price: string;
  discountrate: string;
  movieCode: string;
}

interface MovieData {
  movieCode: string;
  movieName: string;
  synopsis: string;
  poster: string;
  runtime: number;
  price: number;
  discountrate: number;
  vodState: string;
  reservationState: string;
  ratingTpcdName: string;
}

export default function ScheduleForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [theaterList, setTheaterList] = useState<TheaterList[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<Record<string, string[]>>(
    {}
  );

  const [movieList, setMovieList] = useState<any[]>([]);
  const [tableInfo, setTableInfo] = useState({
    searchMovieName: "",
    total: 0,
    loading: false,
    page: 1,
    selectMovie: "",
    selectVisible: false,
  });

  const [selectMovie, setSelectMovie] = useState<MovieData>({
    movieCode: "",
    movieName: "",
    synopsis: "",
    poster: "",
    runtime: 0,
    price: 0,
    discountrate: 0,
    vodState: "",
    reservationState: "",
    ratingTpcdName: "",
  });

  const [postForm, setPostForm] = useState<PostForm>({
    theaterCode: "",
    runDate: dayjs().toDate(),
    startTime: "",
    endTime: "",
    price: "",
    discountrate: "",
    movieCode: "",
  });

  useEffect(() => {
    requestGetTheater({
      runDate: dayjs(postForm.runDate).format("YYYY-MM-DD"),
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setTheaterList(data);
    });
  }, [postForm.runDate]);

  const handleInsertTheater = () => {
    requestInsertTheater({
      runDate: dayjs(postForm.runDate).format("YYYY-MM-DD"),
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setTheaterList(data);
    });
  };

  const handleTimeClick = (theaterCode: string, hour: string) => {
    if (postForm.theaterCode !== theaterCode) {
      setPostForm((prev) => ({
        ...prev,
        theaterCode: theaterCode,
      }));
    }

    const currentSelected = selectedTimes[theaterCode] || [];
    let selected: string[] = [];

    if (currentSelected.includes(hour)) {
      selected = currentSelected.filter((item) => item !== hour);
    } else {
      const timesNumber = currentSelected.map(Number);
      const hourNumber = Number(hour);

      if (timesNumber.length === 0) {
        selected = [hour];
      } else {
        const min = Math.min(...timesNumber);
        const max = Math.max(...timesNumber);

        if (hourNumber === min - 1 || hourNumber === max + 1) {
          selected = [...currentSelected, hour].sort(
            (a, b) => Number(a) - Number(b)
          );
        } else {
          return fn_alert("연속된 시간을 선택해주세요.");
        }
      }
    }

    setSelectedTimes(() => ({ [theaterCode]: selected }));

    if (selected.length > 0) {
      const start = Math.min(...selected.map(Number));
      const end = Math.max(...selected.map(Number)) + 1;
      setPostForm((prev) => ({
        ...prev,
        startTime: start.toString().padStart(2, "0") + ":00",
        endTime: end.toString().padStart(2, "0") + ":00",
      }));
    } else {
      setPostForm((prev) => ({ ...prev, startTime: "", endTime: "" }));
    }
  };

  const handleAddMovieList = () => {
    handleSearch(1);
    setPostForm((prev) => ({ ...prev, movieCode: "" }));
    setTableInfo((prev) => ({ ...prev, selectVisible: true }));
  };
  const handleSearch = (pageNum: number = 1) => {
    setTableInfo((prev) => ({ ...prev, page: pageNum, loading: true }));
    requestGetMovieInfoList({
      movieName: tableInfo.searchMovieName,
      page: pageNum,
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setMovieList(data.list || []);
      setTableInfo((prev) => ({
        ...prev,
        total: data.total | 0,
        loading: false,
      }));
    });
  };
  const handleAddMovieSelect = () => {
    setTableInfo((prev) => ({ ...prev, selectVisible: false }));
    setPostForm((prev) => ({
      ...prev,
      movieCode: selectMovie.movieCode || "",
    }));
  };

  const handleNextStep = () => {
    if (postForm.theaterCode === "") return fn_alert("상영관을 선택해주세요.");
    if (!selectedTimes[postForm.theaterCode])
      return fn_alert("상영시간을 선택해주세요.");
    if (selectedTimes[postForm.theaterCode].length <= 1)
      return fn_alert("상영시간을 1시간 이상 선택해주세요.");
    if (step === 1) return setStep(2);

    if (Number(postForm.price) <= 0) return fn_alert("금액을 입력해주세요.");
    if (postForm.movieCode === "") return fn_alert("영화 정보를 선택해주세요.");

    const payload = {
      ...postForm,
      runDate: dayjs(postForm.runDate).format("YYYY-MM-DD"),
      discountrate: Number(postForm.discountrate),
      price: Number(postForm.price),
    };

    requestInsertRunSchedule(payload).then(({ code, msg }) => {
      if (code !== 200) return fn_alert(msg);
      fn_confirm(msg, () => router.back());
    });
  };

  const columns = [
    { label: "영화번호", key: "movieCode" },
    { label: "영화명", key: "movieName" },
    { label: "DVD판매 활성화", key: "vodState" },
    { label: "예매 활성화", key: "reservationState" },
    { label: "관람등급", key: "ratingTpcdName" },
  ];

  return (
    <div className={style["schedule-wrap"]}>
      <h2>상영관리</h2>

      <div className={style["form-wrap"]}>
        <ol className={style.step}>
          <li className={step === 1 ? style.active : ""}>1</li>
          <li className={step === 2 ? style.active : ""}>2</li>
        </ol>

        {step === 1 && (
          <div className={style.content}>
            <DatePickerField
              label="날짜 선택"
              orientation="col"
              value={postForm.runDate}
              onChange={(d) =>
                setPostForm((prev) => ({ ...prev, runDate: d as Date | null }))
              }
            />
            <div className={style["theater-wrap"]}>
              {theaterList.map((item) => (
                <div
                  key={item.theaterCode}
                  className={`${style["theater-item"]} ${
                    item.theaterCode === postForm.theaterCode
                      ? style.active
                      : ""
                  }`}
                >
                  <p>
                    <span>{item.theaterName}</span>
                    <button
                      onClick={() =>
                        setPostForm((prev) => ({
                          ...prev,
                          theaterCode: item.theaterCode,
                        }))
                      }
                    >
                      선택
                    </button>
                  </p>
                  <ul>
                    {times.map((hour) => {
                      const disabled = item.schedules.some((s) => {
                        const startHour = Number(s.startTime.split(":")[0]);
                        const endHour = Number(s.endTime.split(":")[0]);
                        const currentHour = Number(hour);
                        return (
                          currentHour >= startHour && currentHour < endHour
                        );
                      });
                      return (
                        <li key={hour}>
                          <label className={disabled ? style.disabled : ""}>
                            <input
                              type="checkbox"
                              name="time"
                              value={hour}
                              checked={
                                selectedTimes[item.theaterCode]?.includes(
                                  hour
                                ) || false
                              }
                              aria-hidden="false"
                              disabled={disabled}
                              onChange={() =>
                                handleTimeClick(item.theaterCode, hour)
                              }
                            />
                            <span>{hour}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className={style["add-btn"]}>
              <Button onClick={handleInsertTheater}>추가</Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={style.content}>
            <ul className="form-wrap">
              <li className="row">
                <span className="label">영화관</span>
                <div className="content">
                  <span>
                    {
                      theaterList.find(
                        (item) => item.theaterCode === postForm.theaterCode
                      )?.theaterName
                    }
                  </span>
                </div>
              </li>
              <li className="row">
                <span className="label">날짜</span>
                <div className="content">
                  <span>{dayjs(postForm.runDate).format("YYYY-MM-DD")}</span>
                </div>
              </li>
              <li className="row">
                <span className="label">입장시간</span>
                <div className="content">
                  <span>{postForm.startTime} 시</span>
                </div>
              </li>
              <li className="row">
                <span className="label">퇴장시간</span>
                <div className="content">
                  <span>{postForm.endTime} 시</span>
                </div>
              </li>
              <li className="row">
                <span className="label">판매금액</span>
                <div className="content">
                  <Input
                    placeholder="금액을 입력해주세요."
                    value={postForm.price}
                    onChange={(e) =>
                      setPostForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    min={0}
                    type="number"
                  >
                    <span style={{ alignSelf: "center" }}>원</span>
                  </Input>
                </div>
              </li>
              <li className="row">
                <span className="label">할인율</span>
                <div className="content">
                  <Input
                    placeholder="할인율을 입력해주세요."
                    value={postForm.discountrate}
                    onChange={(e) => {
                      let val = Number(e.target.value);
                      if (val > 100) val = 100;
                      setPostForm((prev) => ({
                        ...prev,
                        discountrate: String(val),
                      }));
                    }}
                    min={0}
                    max={100}
                    type="number"
                  >
                    <span style={{ alignSelf: "center" }}>%</span>
                  </Input>
                </div>
              </li>
              <li>
                <span className="label">영화정보</span>
                <div className="content">
                  <div className={style["movie-content"]}>
                    <Button
                      size="small"
                      variant="yellow"
                      onClick={() => handleAddMovieList()}
                    >
                      등록
                    </Button>

                    <Modal
                      visible={tableInfo.selectVisible}
                      title="영화선택"
                      content={
                        <>
                          <div className={style["search-wrap"]}>
                            <Input
                              width={374}
                              label="영화명"
                              placeholder="영화명을 입력하세요"
                              orientation="col"
                              value={tableInfo.searchMovieName}
                              light
                              onChange={(e) =>
                                setTableInfo((prev) => ({
                                  ...prev,
                                  searchMovieName: e.target.value,
                                }))
                              }
                            />
                            <Button
                              type="button"
                              width={72}
                              size="medium"
                              onClick={() => handleSearch(tableInfo.page)}
                            >
                              검색
                            </Button>
                          </div>

                          <div className="table-wrap light">
                            <div className="total-wrap">
                              <span>
                                총 {tableInfo.total.toLocaleString()}개
                              </span>
                            </div>
                            <Table
                              columns={columns}
                              data={movieList}
                              loading={tableInfo.loading}
                              rowKey="movieCode"
                              selectTable
                              selectKey={selectMovie.movieCode}
                              onSelect={(item) => setSelectMovie(item)}
                            />
                          </div>
                          <Pagination
                            total={tableInfo.total}
                            size={8}
                            modal
                            light
                            pageChange={(p) => handleSearch(p)}
                          />
                        </>
                      }
                      cancelText="취소"
                      confirmText="적용"
                      onClose={() => {
                        setTableInfo((prev) => ({
                          ...prev,
                          selectVisible: false,
                        }));
                      }}
                      onConfirm={handleAddMovieSelect}
                      size="lg"
                    />

                    <div>
                      {postForm.movieCode !== "" && (
                        <>
                          <dl className={style["movie-info"]}>
                            <dt>제목</dt>
                            <dd>{selectMovie.movieName}</dd>
                            <dt>설명</dt>
                            <dd>{selectMovie.synopsis}</dd>
                            <dt>상영시간</dt>
                            <dd>{selectMovie.runtime} 분</dd>
                            <dt>관람등급</dt>
                            <dd>{selectMovie.ratingTpcdName}</dd>
                            <dt className={style["poster-label"]}>포스터</dt>
                            <dd className={style["poster-content"]}>
                              <span className={style.image}>
                                <Image
                                  src={
                                    selectMovie.poster || "/images/fallback.png"
                                  }
                                  alt={selectMovie.movieName || "No image"}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                                  style={{ objectFit: "cover" }}
                                  priority
                                />
                              </span>
                            </dd>
                          </dl>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
        <div className={style["btn-wrap"]}>
          {step === 2 && (
            <Button variant="secondary" onClick={() => setStep(1)}>
              이전
            </Button>
          )}
          <Button variant="yellow" onClick={handleNextStep}>
            {step === 1 ? "다음" : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );
}
