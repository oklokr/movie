"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/user";
import { requestGetCodeList, requestUserInfo } from "@/api/common";
import { setCommonCode } from "@/redux/slices/common";

export default function DeafultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user.info);
  const commonCode = useSelector((state: any) => state.common.code);

  useEffect(() => {
    const codeData = window.localStorage.getItem("code");
    if (codeData) return;
    requestGetCodeList().then((res) => {
      const { code, data } = res;
      if (code !== 200) return;
      window.localStorage.setItem("code", JSON.stringify(data));
    });
  }, []);

  useEffect(() => {
    const code = window.localStorage.getItem("code");
    if (commonCode) return;
    dispatch(setCommonCode(JSON.parse(code)));
  }, [commonCode, dispatch]);

  useEffect(() => {
    if (userInfo) return;
    requestUserInfo().then((res) => {
      if (res?.code === 200 && res.data) {
        dispatch(setUserInfo(res.data));
      }
    });
  }, [userInfo, dispatch]);

  return <>{children}</>;
}
