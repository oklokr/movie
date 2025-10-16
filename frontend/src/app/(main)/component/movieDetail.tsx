"use client";

import { requestGetMovieDetail, requestInsertOrderHistory } from "@/api/main";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { fn_alert, fn_confirm } from "@/components/ui/modal/alert";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./movieDetail.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import PortOne from "@portone/browser-sdk/v2";
import { requestUpdateUserAdult } from "@/api/user";
import { requestGetVerification } from "@/app/api/portone/getVerification/portone";

export default function MovieDetail({ targetMovie, onClose }) {
  const [visible, setVisible] = useState(false);
  const [movieDetail, setMovieDetail] = useState();
  const userInfo = useSelector((state: RootState) => state.user.info);
  const router = useRouter();

  // targetMovie가 바뀔 때 Modal 열기
  useEffect(() => {
    if (targetMovie) {
      console.log(targetMovie);
      requestGetMovieDetail({
        movieCode: targetMovie,
      }).then(({ code, data, msg }) => {
        if (code !== 200) return fn_alert(msg);
        setMovieDetail(data);
        setVisible(true);
      });
    }
  }, [targetMovie]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
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

  const handleDvdPurchase = async () => {
    if (!userInfo)
      return fn_confirm("로그인 후 이용 가능한 서비스입니다.", () =>
        router.push("login")
      );
    if (movieDetail?.ratingTpcd === "1" && !(await verification())) return;

    const portReq = await PortOne.requestPayment({
      storeId: "store-b8a100e7-dc2e-4038-9c32-d5cdd79add6b",
      channelKey: "channel-key-8443f953-cb4f-4e90-8dd8-87b6def02536",
      paymentId: generateUUID(),
      orderName: `${movieDetail.movieName} DVD`,
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

    const { code, msg } = await requestInsertOrderHistory({
      movieCode: movieDetail.movieCode,
      orderCode: portReq.paymentId,
      orderTpye: "VOD",
      price: movieDetail.price,
      userId: userInfo.userId,
    });
    if (code !== 200) return fn_alert(msg);
    fn_alert(msg);
  };

  return (
    <Modal
      visible={visible}
      closeColor="white"
      content={
        <>
          <div className={style.image}>
            <Image
              src={movieDetail?.background}
              alt={movieDetail?.movieName}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className={style.content}>
            {(movieDetail?.genreA ||
              movieDetail?.genreB ||
              movieDetail?.genreC) && (
              <ul className={style["tag-wrap"]}>
                {movieDetail?.genreA && <li>{movieDetail?.genreA}</li>}
                {movieDetail?.genreB && <li>{movieDetail?.genreB}</li>}
                {movieDetail?.genreC && <li>{movieDetail?.genreC}</li>}
              </ul>
            )}
            <p>
              <strong>{movieDetail?.movieName}</strong>
              <span>{movieDetail?.synopsis}</span>
            </p>
          </div>
          <div className={style["btn-wrap"]}>
            {movieDetail?.vodState === "Y" && (
              <Button onClick={handleDvdPurchase}>DVD구매하기</Button>
            )}
            {movieDetail?.reservationState === "Y" && (
              <Button onClick={() => {}}>예매하기</Button>
            )}
          </div>
        </>
      }
      onClose={handleClose}
      size="lg"
    />
  );
}
