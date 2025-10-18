"use client";

import {
  requestGetAvailableSeats,
  requestGetMovieDetail,
  requestGetScheduleList,
  requestInsertReservation,
} from "@/api/main";
import { fn_alert, fn_confirm } from "@/components/ui/modal/alert";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import Image from "next/image";
import Select from "@/components/ui/select";
import DatePickerField from "@/components/ui/datePicker";
import dayjs from "dayjs";
import Button from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { requestGetVerification } from "@/api/common";
import { requestUpdateUserAdult } from "@/api/user";
import PortOne from "@portone/browser-sdk/v2";

interface PostForm {
  date: Date | null;
  theaterCode: string;
  scheduleCode: string;
  seats: string[];
}

interface MovieDetail {
  movieName: string;
  poster: string;
  synopsis: string;
  actorA?: string;
  actorB?: string;
  actorC?: string;
  actorD?: string;
  actorE?: string;
  genreA?: string;
  genreB?: string;
  genreC?: string;
}

interface TheaterOption {
  label: string;
  value: string;
  time: { scheduleCode: string; start: string; end: string }[];
}

const seatArray = ["A", "B", "C", "D", "E", "F", "G"];

export default function ReservationForm() {
  const params = useParams();
  const movieCode = params.movieCode as string;
  const userInfo = useSelector((state: RootState) => state.user.info);
  const router = useRouter();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [theaterList, setTheaterList] = useState<TheaterOption[]>([]);
  const [availableSeats, setAvailableSeats] = useState<string[]>([]);
  const [postForm, setPostForm] = useState<PostForm>({
    date: dayjs().toDate(),
    theaterCode: "",
    scheduleCode: "",
    seats: [],
  });

  useEffect(() => {
    requestGetMovieDetail({ movieCode }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setMovieDetail(data);
    });
  }, [movieCode]);

  useEffect(() => {
    requestGetScheduleList({
      movieCode,
      runDate: dayjs(postForm.date).format("YYYY-MM-DD"),
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);

      setTheaterList(
        data.map((item) => ({
          label: item.theaterName,
          value: item.theaterCode,
          time: item.time,
        }))
      );
    });
  }, [movieCode, postForm.date]);

  useEffect(() => {
    if (!postForm.theaterCode || !postForm.scheduleCode) return;

    requestGetAvailableSeats({
      movieCode,
      scheduleCode: postForm.scheduleCode,
      theaterCode: postForm.theaterCode,
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);

      const seats = data
        .filter((s) => s.available === "Y")
        .map((s) => s.SEAT_CODE);

      setAvailableSeats(seats);

      setPostForm((prev) => ({ ...prev, seats: [] }));
    });
  }, [postForm.theaterCode, postForm.scheduleCode]);

  const fetchTimes = (theaterCode: string) => {
    if (!theaterList) return [];
    return theaterList.find((item) => item.value === theaterCode)?.time || [];
  };

  const toggleSeat = (seatCode: string) => {
    setPostForm((prev) => {
      if (prev.seats.includes(seatCode)) {
        return { ...prev, seats: prev.seats.filter((s) => s !== seatCode) };
      } else {
        return { ...prev, seats: [...prev.seats, seatCode] };
      }
    });
  };

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const verification = async () => {
    if (userInfo.adult === "Y") return true;
    const { identityVerificationId } =
      await PortOne.requestIdentityVerification({
        storeId: "store-b8a100e7-dc2e-4038-9c32-d5cdd79add6b",
        identityVerificationId: `${encodeURI(
          userInfo.userId
        )}-${generateUUID()}`,
        channelKey: "channel-key-34cf76b7-d3d8-48de-b0af-fc05167aebdf",
        flgFixedUser: "Y",
      });
    if (!identityVerificationId)
      return fn_confirm("결제 오류입니다 관리자에게 문의해주세요.", () =>
        router.push("/")
      );
    const res = await requestGetVerification(identityVerificationId);
    const birthDate = new Date(res.data.verifiedCustomer.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
    if (!hasHadBirthdayThisYear) age--;

    if (age >= 19)
      await requestUpdateUserAdult({ userId: userInfo.userId, adult: "Y" });
    return age >= 19;
  };

  const handlePayment = async () => {
    if (!userInfo)
      return fn_confirm("로그인 후 이용 가능한 서비스입니다.", () =>
        router.push("login")
      );
    if (movieDetail?.ratingTpcd === "1" && !(await verification())) return;

    const portReq = await PortOne.requestPayment({
      storeId: "store-b8a100e7-dc2e-4038-9c32-d5cdd79add6b",
      channelKey: "channel-key-8443f953-cb4f-4e90-8dd8-87b6def02536",
      paymentId: generateUUID(),
      orderName: `${movieDetail.movieName} 예매`,
      totalAmount: 1000,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer: {
        fullName: userInfo.userName,
        phoneNumber: userInfo.tel,
        email: "test@portone.io",
      },
    });
    if (portReq.code === "FAILURE_TYPE_PG")
      return fn_alert("결제를 취소했습니다.");

    const payload = {
      orderCode: portReq.paymentId,
      userId: userInfo?.userId,
      movieCode: movieCode,
      price: movieDetail?.price,
      reserveDate: dayjs(postForm.date).format("YYYY-MM-DD"),
      theaterCode: postForm.theaterCode,
      scheduleCode: postForm.scheduleCode,
      seatCode: postForm.seats.map((item) =>
        item.replace(`${postForm.theaterCode}_`, "")
      ),
    };

    const { code, msg } = await requestInsertReservation(payload);
    if (code !== 200) return fn_alert(msg);
    fn_confirm(msg, () => router.push("/"));
  };

  return (
    <div className={style["reservation-wrap"]}>
      <h2>예매하기</h2>

      <div className={style["movie-wrap"]}>
        <div className={style["movie-info"]}>
          <div className={style.image}>
            <Image
              src={movieDetail?.background || ""}
              alt={movieDetail?.movieName || ""}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <ul>
            <li>
              <strong>제목 : </strong>
              <span>{movieDetail?.movieName}</span>
            </li>
            <li>
              <strong>설명 : </strong>
              <span>{movieDetail?.synopsis}</span>
            </li>
            <li>
              <strong>출현진 : </strong>
              <span>
                {`${movieDetail?.actorA || ""}, ${movieDetail?.actorB || ""}, ${
                  movieDetail?.actorC || ""
                }, ${movieDetail?.actorD || ""}, ${movieDetail?.actorE || ""}`}
              </span>
            </li>
            <li>
              <strong>장르 : </strong>
              <span>
                {`${movieDetail?.genreA || ""}, ${movieDetail?.genreB || ""}, ${
                  movieDetail?.genreC || ""
                }`}
              </span>
            </li>
          </ul>
        </div>

        <div className={style["form-wrap"]}>
          <dl className={style.info}>
            <dt>좌석선택 :</dt>
            <dd>
              <span>
                {postForm.theaterCode &&
                  theaterList.find(
                    (item) => item.value === postForm.theaterCode
                  )?.label}
              </span>
              <span>
                {postForm.scheduleCode &&
                  (() => {
                    const schedule = theaterList
                      .find((item) => item.value === postForm.theaterCode)
                      ?.time.find(
                        (t) => t.scheduleCode === postForm.scheduleCode
                      );
                    return schedule
                      ? `${schedule.start} ~ ${schedule.end}`
                      : "";
                  })()}
              </span>
              <span>
                {postForm.seats
                  .map((item) => item.replace(`${postForm.theaterCode}_`, ""))
                  .join(", ")}
              </span>
            </dd>
          </dl>

          <div className={style.selecter}>
            <Select
              width={374}
              label="상영관"
              orientation="col"
              placeholder="구분을 선택하세요"
              options={theaterList || []}
              onChange={(val) => {
                setPostForm((prev) => ({
                  ...prev,
                  theaterCode: val,
                  scheduleCode: "",
                  seats: [],
                }));
                setAvailableSeats([]);
              }}
            />
            <DatePickerField
              label="날짜 선택"
              orientation="col"
              value={postForm.date}
              onChange={(d) => {
                setPostForm((prev) => ({
                  ...prev,
                  date: d as Date | null,
                  theaterCode: "",
                  scheduleCode: "",
                  seats: [],
                }));
                setAvailableSeats([]);
              }}
            />
          </div>

          <div className={style["time-selecter"]}>
            <ul>
              {fetchTimes(postForm.theaterCode).map((item) => (
                <li key={item.scheduleCode}>
                  <label>
                    <input
                      type="radio"
                      name="time"
                      value={item.scheduleCode}
                      checked={item.scheduleCode === postForm.scheduleCode}
                      onChange={() =>
                        setPostForm((prev) => ({
                          ...prev,
                          scheduleCode: item.scheduleCode,
                        }))
                      }
                    />
                    <span>{`${item.start} ~ ${item.end}`}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <ul className={style["seat-wrap"]}>
            {seatArray.map((col) => (
              <li key={col} className={style["seat-column"]}>
                <p className={style["seat-label"]}>{col}</p>
                {Array.from({ length: 15 }, (_, i) => {
                  const seatCode = `${postForm.theaterCode}_${col}${i + 1}`;
                  const isSelected = postForm.seats.includes(seatCode);
                  const isAvailable = availableSeats.includes(seatCode);
                  return (
                    <label key={seatCode}>
                      <input
                        type="checkbox"
                        disabled={!isAvailable}
                        checked={isSelected}
                        onChange={() => toggleSeat(seatCode)}
                      />
                      <span
                        className={`${style.seat} ${
                          !isAvailable ? style.disabled : ""
                        } ${isSelected ? style.selected : ""}`}
                      >
                        {i + 1}
                      </span>
                    </label>
                  );
                })}
              </li>
            ))}
            <li className={style["seat-number"]}>
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </li>
          </ul>

          <div className={style["btn-wrap"]}>
            <Button onClick={handlePayment}>결제하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
