"use client";

import Input from "@/components/ui/input";
import style from "./style.module.scss";
import Button from "@/components/ui/button";
import Select from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { requestGetUserList } from "@/api/admin";
import { fn_alert } from "@/components/ui/modal/alert";
import Pagination from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Table from "@/components/ui/table";
import { codeOption } from "@/utils/codeOption";

interface UserType {
  id: string;
  adult: string;
  email: string;
  passwd: string;
  signupDate: string;
  tel: string;
  userId: string;
  userName: string;
  userTpcd: string;
  userTpcdName: string;
}

export default function UserTable() {
  const code = useSelector((state: RootState) => state.common.code);

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const userId = searchParams.get("userId") || "";
  const userTpcd = searchParams.get("userTpcd") || "";

  const [userList, setUserList] = useState<UserType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState<string>("");
  const [searchTpcd, setSearchTpcd] = useState<string>("");

  const fetchUserList = (pageNum: number, userId: string, userTpcd: string) => {
    setLoading(true);
    requestGetUserList({
      page: pageNum,
      userId: userId,
      userTpcd: userTpcd,
    }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setTotal(data.total);
      setUserList(data.list);
      setLoading(false);
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // 검색 시 항상 1페이지로
    if (searchId) params.set("userId", searchId);
    else params.delete("userId");
    if (searchTpcd) params.set("userTpcd", searchTpcd);
    else params.delete("userTpcd");
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleClick = (item: UserType) => {
    router.push(`members/detail/${item.userId}`);
  };

  const userTypes = useMemo(
    () => codeOption(code.USER_TPCD, { label: "전체", value: "" }, true),
    [code]
  );

  useEffect(() => {
    fetchUserList(page, userId, userTpcd);
  }, [page, userId, userTpcd]);

  useEffect(() => {
    const urlUserId = searchParams.get("userId") || "";
    const urlUserTpcd = searchParams.get("userTpcd") || "";
    setSearchId(urlUserId);
    setSearchTpcd(urlUserTpcd);
  }, [searchParams]);

  const columns = [
    { label: "구분", key: "userTpcdName" },
    { label: "회원명", key: "userName" },
    { label: "회원ID", key: "userId" },
    { label: "이메일", key: "email" },
    { label: "전화번호", key: "tel" },
    { label: "가입일자", key: "signupDate" },
  ];

  return (
    <div className={style["user-table"]}>
      <h2>회원관리</h2>
      <div className={style["search-wrap"]}>
        <Input
          width={374}
          label="아이디"
          placeholder="아이디를 입력하세요"
          orientation="col"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Select
          width={374}
          label="구분"
          orientation="col"
          placeholder="구분을 선택하세요"
          options={userTypes || []}
          value={searchTpcd}
          onChange={(val) => setSearchTpcd(String(val))}
        />
        <Button
          type="button"
          variant="yellow"
          size="small"
          width={72}
          onClick={handleSearch}
        >
          검색
        </Button>
      </div>
      <div className="table-wrap">
        <div className="total-wrap">
          <span>총 {total.toLocaleString()}명</span>
        </div>
        <Table
          columns={columns}
          data={userList}
          loading={loading}
          rowKey="userId"
          onRowClick={(item) => handleClick(item)}
        />
      </div>
      <Pagination total={total} size={8} />
    </div>
  );
}
