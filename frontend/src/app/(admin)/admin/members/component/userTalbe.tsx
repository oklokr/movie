"use client";

import Input from "@/components/ui/input";
import style from "./stlye.module.scss";
import Button from "@/components/ui/button";
import Select from "@/components/ui/select";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { CommonCodeItem } from "@/redux/slices/common";

export default function UserTable() {
  const code = useSelector((state: RootState) => state.common.code);

  const userTypes = useMemo(
    () =>
      code.USER_TPCD?.map((item: CommonCodeItem) => ({
        label:
          item.commonName.charAt(0).toUpperCase() + item.commonName.slice(1),
        value: item.commonValue,
      })),
    [code]
  );

  return (
    <div className={style["user-table"]}>
      <h2>회원관리</h2>
      <div className={style["search-wrap"]}>
        <Input
          label="회원명"
          placeholder="회원명을 입력하세요"
          orientation="col"
          width={"100%"}
        />
        <Select
          label="구분"
          orientation="col"
          placeholder="구분을 선택하세요"
          options={userTypes || []}
          width={"100%"}
        />
        <Button type="button" variant="yellow" size="small" width={120}>
          검색
        </Button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>회원명</th>
              <th>회원ID</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>가입일자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F123A</td>
              <td>Apple</td>
              <td>$22</td>
              <td>$22</td>
              <td>$22</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
