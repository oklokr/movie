"use client";

import Link from "next/link";
import style from "../../stlye.module.scss";
import { Field, Input, Stack } from "@chakra-ui/react";

export default function LoginForm() {
  return (
    <div className={style.form}>
      <h2>로그인</h2>
      <Stack>
        <Field.Root>
          <Field.Label>ID</Field.Label>
          <Input placeholder="아이디를 입력해주세요." />
          <Field.ErrorText>아이디를 입력해주세요.</Field.ErrorText>
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input placeholder="비밀번호를 입력해주세요." />
          <Field.ErrorText>비밀번호를 입력해주세요.</Field.ErrorText>
        </Field.Root>
      </Stack>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <ul>
        <li>
          <Link href="/">회원가입</Link>
        </li>
        <li>
          <Link href="/">아이디 찾기</Link>
        </li>
        <li>
          <Link href="/">비밀번호 찾기</Link>
        </li>
      </ul>
      <button>로그인</button>
    </div>
  );
}
