"use client";

import Link from "next/link";
import style from "../../stlye.module.scss";
import Input from "@/components/ui/input";
import { useState } from "react";
import { requestLogin } from "@/api/common";
import Button from "@/components/ui/button";
import { fn_alert } from "@/components/ui/modal/alert";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/user";

const defaultState = {
  id: {
    state: true,
    text: "아이디를 입력해주세요.",
  },
  pw: {
    state: true,
    text: "비밀번호를 입력해주세요.",
  },
};

export default function LoginForm() {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState(defaultState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    setError((prev) => ({
      id: { state: id !== "", text: prev.id.text },
      pw: { state: passwd !== "", text: prev.pw.text },
    }));

    if (!id) return fn_alert("아이디를 입력해주세요.");
    if (!passwd) return fn_alert("비밀번호를 입력해주세요.");

    requestLogin({ userId: id, passwd: passwd }).then((res) => {
      const { code, data } = res;
      if (code !== 200) return fn_alert("일치하는 계정이 없습니다.");
      console.log(data);
      dispatch(setUserInfo(data));
      router.push("/");
    });
  };

  return (
    <div className={style.form}>
      <h2>로그인</h2>
      <Input
        label="ID"
        placeholder="ID를 입력하세요"
        value={id}
        onChange={(e) => setId(e.target.value)}
        error={error.id.state ? "" : error.id.text}
        validate
        onKeyDown={(e) => (e.key === "Enter" ? handleLogin() : null)}
      />
      <Input
        label="PW"
        placeholder="비밀번호를 입력하세요"
        type="password"
        value={passwd}
        onChange={(e) => setPasswd(e.target.value)}
        validate
        error={error.pw.state ? "" : error.pw.text}
        onKeyDown={(e) => (e.key === "Enter" ? handleLogin() : null)}
      />
      <ul className={style["link-wrap"]}>
        <li>
          <Link href="/signup">회원가입</Link>
        </li>
        <li>
          <Link href="/findId">아이디 찾기</Link>
        </li>
        <li>
          <Link href="/findPw">비밀번호 찾기</Link>
        </li>
      </ul>
      <Button width="100%" onClick={handleLogin}>
        로그인
      </Button>
    </div>
  );
}
