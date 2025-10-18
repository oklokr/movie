"use client";

import Input from "@/components/ui/input";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./info.module.scss";
import Button from "@/components/ui/button";

export default function Info() {
  const userInfo = useSelector((state: RootState) => state.user.info);
  const [edit, setEdit] = useState(false);
  const [postForm, setPostForm] = useState({
    passwd: "",
    rePasswd: "",
    tel: "",
    email: "",
  });

  useEffect(() => {
    setPostForm({
      passwd: "",
      rePasswd: "",
      tel: userInfo?.tel,
      email: userInfo?.email,
    });
  }, [userInfo]);

  const handleEdit = () => {
    console.log(postForm);
    setEdit(false);
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
                placeholder="비밀번호"
                value={postForm.passwd}
                orientation="col"
                labelWidth="98px"
                labelAlign="right"
                onChange={(e) =>
                  setPostForm((prev) => ({ ...prev, userId: e.target.value }))
                }
              />
              <Input
                width={"100%"}
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                value={postForm.rePasswd}
                orientation="col"
                labelWidth="98px"
                labelAlign="right"
                onChange={(e) =>
                  setPostForm((prev) => ({ ...prev, userName: e.target.value }))
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
        <li>
          <div className={style["input-wrap"]}>
            <span className={style.label}>성인인증</span>
            <span className={style.content}>
              {userInfo?.adult === "Y" ? "인증완료" : "미인증"}
            </span>
          </div>
        </li>
      </ul>
      <div className={style["btn-wrap"]}>
        {!edit && (
          <Button variant="yellow" onClick={() => setEdit(true)}>
            수정하기
          </Button>
        )}
        {edit && <Button onClick={handleEdit}>수정</Button>}
      </div>
    </>
  );
}
