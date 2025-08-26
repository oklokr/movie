"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/user";
import { requestGetCodeList, requestUserInfo } from "@/api/common";

export default function DeafultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user.info);

  useEffect(() => {
    if (!userInfo) {
      requestUserInfo().then((res) => {
        if (res?.code === 200 && res.data) {
          dispatch(setUserInfo(res.data));
        }
      });
    }
  }, [userInfo, dispatch]);

  requestGetCodeList().then((res) => {
    console.log(res);
  });

  return <>{children}</>;
}
