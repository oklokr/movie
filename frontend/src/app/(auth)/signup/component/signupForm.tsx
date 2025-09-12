"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import style from "../style.module.scss";
import { useState } from "react";
import { requestCheckId, requestSignup } from "@/api/auth";
import { fn_alert } from "@/components/ui/modal/alert";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/user";

type SignupFormKey = keyof typeof defaultSignupForm;

const defaultSignupForm = {
  userId: {
    value: "",
    msg: "",
  },
  email: {
    value: "",
    msg: "",
  },
  passwd: {
    value: "",
    msg: "",
  },
  rePasswd: {
    value: "",
    msg: "",
  },
  userName: {
    value: "",
    msg: "",
  },
  tel: {
    value: "",
    msg: "",
  },
};
export default function SignupForm() {
  const [signupForm, setSignupForm] = useState(defaultSignupForm);
  const [idCheckState, setIdCheckState] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCheckId = () => {
    requestCheckId({ userId: signupForm.userId.value }).then((res) => {
      const { code, msg } = res;
      fn_alert(msg);
      setIdCheckState(code === 200);
    });
  };

  const handleSignup = () => {
    let hasError = false;
    const setErrorMsg = (id: SignupFormKey, msg: string) => {
      setSignupForm((prev) => ({
        ...prev,
        [id]: { ...prev[id], msg },
      }));
      if (msg) fn_alert(msg);
      if (msg) hasError = true;
    };
    (
      [
        ["userName", "이름을 입력해주세요."],
        ["userId", "아이디를 입력해주세요."],
        ["email", "이메일을 입력해주세요."],
        ["passwd", "비밀번호를 입력해주세요."],
        ["rePasswd", "비밀번호 확인을 입력해주세요."],
        ["tel", "전화번호를 입력해주세요."],
      ] as [SignupFormKey, string][]
    ).forEach(([key, msg]) => {
      if (signupForm[key].value.trim() === "") setErrorMsg(key, msg);
      else setErrorMsg(key, "");
    });

    if (!idCheckState) setErrorMsg("userId", "아이디 중복체크를 해주세요.");

    if (signupForm.passwd.value !== signupForm.rePasswd.value) {
      setErrorMsg("rePasswd", "비밀번호가 일치하지 않습니다.");
    }

    if (hasError) return;

    requestSignup({
      userId: signupForm.userId.value,
      email: signupForm.email.value,
      passwd: signupForm.passwd.value,
      userName: signupForm.userName.value,
      tel: signupForm.tel.value,
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      dispatch(setUserInfo(data));
      router.push("/");
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const key = id as SignupFormKey;
    setSignupForm((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
        msg: value !== "" ? "" : prev[key].msg,
      },
    }));
  };

  return (
    <div>
      <h2>회원가입</h2>
      <div className={style["form-wrap"]}>
        <Input
          id="userName"
          label="이름"
          type="text"
          placeholder="이름을 입력하세요"
          value={signupForm.userName.value}
          validate
          error={signupForm.userName.msg}
          onChange={handleChange}
        />
        <Input
          id="userId"
          label="아이디"
          placeholder="ID를 입력하세요"
          value={signupForm.userId.value}
          validate
          error={signupForm.userId.msg}
          onChange={handleChange}
        >
          <Button size="small" variant="yellow" onClick={handleCheckId}>
            중복확인
          </Button>
        </Input>
        <Input
          id="passwd"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={signupForm.passwd.value}
          validate
          error={signupForm.passwd.msg}
          onChange={handleChange}
        />
        <Input
          id="rePasswd"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={signupForm.rePasswd.value}
          validate
          error={signupForm.rePasswd.msg}
          onChange={handleChange}
        />
        <Input
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          value={signupForm.email.value}
          validate
          error={signupForm.email.msg}
          onChange={handleChange}
        />
        <Input
          id="tel"
          label="전화번호"
          type="text"
          placeholder="010-0000-0000"
          value={signupForm.tel.value}
          validate
          error={signupForm.tel.msg}
          onChange={handleChange}
        />

        <Button variant="yellow" onClick={handleSignup}>
          회원가입
        </Button>
      </div>

      <p className={style.message}>
        이미 계정이 있으신가요? <a href="/login">로그인하기</a>
      </p>
    </div>
  );
}
