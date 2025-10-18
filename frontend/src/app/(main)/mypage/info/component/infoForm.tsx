"use client";

import Input from "@/components/ui/input";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./style.module.scss";
import Button from "@/components/ui/button";
import { fn_alert, fn_confirm } from "@/components/ui/modal/alert";
import { useRouter } from "next/navigation";
import PortOne from "@portone/browser-sdk/v2";
import { requestUpdateUserAdult, requestupdateUserInfo } from "@/api/user";
import { requestGetVerification } from "@/app/api/portone/getVerification/portone";

export default function InfoForm() {
  const userInfo = useSelector((state: RootState) => state.user.info);
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [adult, setAdult] = useState("N");
  const [postForm, setPostForm] = useState({
    userId: "",
    passwd: "",
    rePasswd: "",
    tel: "",
    email: "",
  });

  useEffect(() => {
    setPostForm({
      userId: userInfo?.userId,
      passwd: "",
      rePasswd: "",
      tel: userInfo?.tel,
      email: userInfo?.email,
    });
    setAdult(userInfo?.adult);
  }, [userInfo]);

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
      return fn_confirm("인증 오류입니다 관리자에게 문의해주세요.", () =>
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

    if (age >= 19) {
      await requestUpdateUserAdult({ userId: userInfo.userId, adult: "Y" });
      return setAdult("Y");
    }
    setAdult("N");
  };

  const handleEdit = () => {
    if (postForm.passwd === "") return fn_alert("비밀번호를 입력해주세요.");
    if (postForm.rePasswd === "")
      return fn_alert("비밀번호 확인을 입력해주세요.");
    if (postForm.tel === "") return fn_alert("전화번호를 입력해주세요.");
    if (postForm.email === "") return fn_alert("이메일을 입력해주세요.");
    if (postForm.passwd !== postForm.rePasswd)
      return fn_alert("비밀번호가 일치하지 않습니다.");

    const { rePasswd, ...payload } = postForm;

    requestupdateUserInfo(payload).then((res) => {
      const { code, msg } = res;
      if (code !== 200) return fn_alert(msg);
      fn_confirm(msg, () => setEdit(false));
    });
  };

  return (
    <>
      <ul className={style["info-wrap"]}>
        <li>
          <div className={style["input-wrap"]}>
            <span className={style.label}>아이디</span>
            <span className={style.content}>{userInfo?.userId}</span>
          </div>
          <div className={style["input-wrap"]}>
            <span className={style.label}>이름</span>
            <span className={style.content}>{userInfo?.userName}</span>
          </div>
        </li>
        <li>
          {edit ? (
            <>
              <Input
                width={"100%"}
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={postForm.passwd}
                orientation="col"
                labelWidth="98px"
                labelAlign="right"
                onChange={(e) =>
                  setPostForm((prev) => ({ ...prev, passwd: e.target.value }))
                }
              />
              <Input
                width={"100%"}
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={postForm.rePasswd}
                orientation="col"
                labelWidth="98px"
                labelAlign="right"
                onChange={(e) =>
                  setPostForm((prev) => ({ ...prev, rePasswd: e.target.value }))
                }
              />
            </>
          ) : (
            <>
              <div className={style["input-wrap"]}>
                <span className={style.label}>비밀번호</span>
                <span className={style.content}>****</span>
              </div>
              <div className={style["input-wrap"]}>
                <span className={style.label}>비밀번호 확인</span>
                <span className={style.content}>****</span>
              </div>
            </>
          )}
        </li>
        <li>
          {edit ? (
            <>
              <Input
                width={"100%"}
                label="전화번호"
                placeholder="전화번호"
                value={postForm.tel}
                orientation="col"
                labelWidth="98px"
                labelAlign="right"
                onChange={(e) =>
                  setPostForm((prev) => ({ ...prev, tel: e.target.value }))
                }
              />
              <Input
                width={"100%"}
                label="이메일"
                type="email"
                placeholder="이메일"
                value={postForm.email}
                orientation="col"
                labelWidth="98px"
                labelAlign="right"
                onChange={(e) =>
                  setPostForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </>
          ) : (
            <>
              <div className={style["input-wrap"]}>
                <span className={style.label}>전화번호</span>
                <span className={style.content}>{postForm.tel}</span>
              </div>
              <div className={style["input-wrap"]}>
                <span className={style.label}>이메일</span>
                <span className={style.content}>{postForm.email}</span>
              </div>
            </>
          )}
        </li>
        <li>
          <div className={style["input-wrap"]}>
            <span className={style.label}>회원유형</span>
            <span className={style.content}>{userInfo?.userTpcdName}</span>
          </div>
          <div className={style["input-wrap"]}>
            <span className={style.label}>가입일자</span>
            <span className={style.content}>{userInfo?.signupDate}</span>
          </div>
        </li>
        <li className={style.adult}>
          <div className={style["input-wrap"]}>
            <span className={style.label}>성인인증</span>
            <span
              className={`${style.content} ${
                adult === "N" && edit ? style.active : ""
              }`}
            >
              {adult === "Y" ? "인증완료" : "미인증"}
            </span>
            {adult === "N" && edit && (
              <Button onClick={verification}>인증</Button>
            )}
          </div>
        </li>
      </ul>
      <div className={style["btn-wrap"]}>
        {!edit && (
          <Button width={92} variant="yellow" onClick={() => setEdit(true)}>
            수정하기
          </Button>
        )}
        {edit && (
          <Button width={92} onClick={handleEdit}>
            수정
          </Button>
        )}
      </div>
    </>
  );
}
