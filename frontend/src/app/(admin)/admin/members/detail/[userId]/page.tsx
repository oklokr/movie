"use client";

import style from "./style.module.scss";
import Button from "@/components/ui/button";
import {
  requestChangeUserPasswd,
  requestChangeUserTpcd,
  requestGetUserInfo,
} from "@/api/admin";
import { useEffect, useMemo, useState } from "react";
import { fn_alert } from "@/components/ui/modal/alert";
import Select from "@/components/ui/select";
import { useSelector } from "react-redux";
import { CommonCodeItem } from "@/redux/slices/common";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";

interface UserInfo {
  userId: string;
  passwd: string;
  userName: string;
  tel: string;
  email: string;
  userTpcd: string;
  userTpcdName: string;
  signupDate: string;
  adult: string;
  totalReservation: number;
  totalVod: number;
  totalPayment: number;
}

export default function MembersPage() {
  const [loading, setLoading] = useState(true);
  const [selectUserTpcd, setSelectUserTpcd] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const code = useSelector((state: RootState) => state.common.code);
  const searchParams = useSearchParams();
  const paramUserId = searchParams.get("userId");
  const router = useRouter();

  useEffect(() => {
    requestGetUserInfo({ userId: paramUserId }).then((res) => {
      const { code, data, msg } = res;
      if (code !== 200) return fn_alert(msg);
      setLoading(false);
      setUserInfo(data);
      setSelectUserTpcd(data.userTpcd);
    });
  }, [paramUserId]);

  const userTypes = useMemo(
    () =>
      code.USER_TPCD?.map((item: CommonCodeItem) => ({
        label:
          item.commonName.charAt(0).toUpperCase() + item.commonName.slice(1),
        value: item.commonValue,
      })),
    [code]
  );

  const handleResetPasswd = async () => {
    const result = await requestChangeUserPasswd({ userId: paramUserId });
    if (result.code !== 200) return fn_alert(result.msg);
    fn_alert(result.msg);
  };

  const handleChangeUserTpcd = async () => {
    const result = await requestChangeUserTpcd({
      userId: paramUserId,
      userTpcd: selectUserTpcd || null,
    });
    if (result.code !== 200) return fn_alert(result.msg);
    fn_alert(result.msg);
  };

  return (
    <div className={style["detail-wrap"]}>
      <h2>회원관리 상세</h2>
      <div className={style["info-box"]}>
        {loading ? (
          <div className="spinner" />
        ) : (
          <>
            <div className={style["info-wrap"]}>
              <h3>회원정보</h3>
              <dl>
                <dt>아이디</dt>
                <dd>{userInfo?.userId}</dd>
                <dt>이름</dt>
                <dd>{userInfo?.userName}</dd>
                <dt>비밀번호</dt>
                <dd>**********</dd>
                <dt>이메일</dt>
                <dd>{userInfo?.email}</dd>
                <dt>전화번호</dt>
                <dd>{userInfo?.tel}</dd>
              </dl>
              <Button size="small" variant="yellow" onClick={handleResetPasswd}>
                비밀번호 초기화
              </Button>
            </div>
            <div className={style["info-wrap"]}>
              <h3>사이트 이용정보</h3>
              <dl>
                <dt>가입일자</dt>
                <dd>{userInfo?.signupDate}</dd>
                <dt>총 결제 금액</dt>
                <dd>{userInfo?.totalPayment.toLocaleString()} 원</dd>
                <dt>DVD구매 횟수</dt>
                <dd>{userInfo?.totalVod.toLocaleString()} 회</dd>
                <dt>예매 횟수</dt>
                <dd>{userInfo?.totalReservation.toLocaleString()} 회</dd>
                <dt>사용자 유형</dt>
                <dd>
                  <Select
                    options={userTypes}
                    value={selectUserTpcd}
                    onChange={(val) => setSelectUserTpcd(String(val))}
                  />
                </dd>
              </dl>
              <Button
                size="small"
                variant="yellow"
                onClick={handleChangeUserTpcd}
              >
                적용
              </Button>
            </div>
          </>
        )}
      </div>

      <div className={style["btn-wrap"]}>
        <Button variant="yellow" onClick={router.back}>
          뒤로가기
        </Button>
      </div>
    </div>
  );
}
