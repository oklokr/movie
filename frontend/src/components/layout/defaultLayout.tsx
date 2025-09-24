"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/user";
import { requestGetCodeList, requestUserInfo } from "@/api/common";
import { setCommonCode } from "@/redux/slices/common";
import { RootState } from "@/redux/store";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-datepicker/dist/react-datepicker.css";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.info);
  const commonCode = useSelector((state: RootState) => state.common.code);

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
    if (commonCode && Object.keys(commonCode).length > 0) return;
    dispatch(setCommonCode(JSON.parse(code ?? "{}")));
  }, [commonCode, dispatch]);

  useEffect(() => {
    const match = document.cookie.match(
      "(^|;) ?" + "jwtToken" + "=([^;]*)(;|$)"
    );
    const jwtToken = match ? match[2] : null;

    if (!jwtToken || userInfo) return;

    requestUserInfo().then((res) => {
      if (res?.code === 200 && res.data) {
        dispatch(setUserInfo(res.data));
      }
    });
  }, [userInfo, dispatch]);

  return <div className="app">{children}</div>;
}
