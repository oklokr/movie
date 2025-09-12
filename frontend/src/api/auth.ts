import request from "@/utils/request.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface requestType<T = any> {
  code: number;
  data: T;
  msg: string;
}

export function requestSignup(data: {
  userId: string;
  email: string;
  passwd: string;
  userName: string;
  tel: string;
}): Promise<requestType> {
  return request({
    url: "/api/auth/signup",
    method: "post",
    data,
  });
}

export function requestCheckId(data: { userId: string }): Promise<requestType> {
  return request({
    url: "/api/auth/checkId",
    method: "post",
    data,
  });
}
