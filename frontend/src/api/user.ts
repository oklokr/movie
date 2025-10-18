import request from "@/utils/request.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface requestType<T = any> {
  code: number;
  data: T;
  msg: string;
}

export function requestUpdateUserAdult(data: {
  userId: string;
  adult: string;
}): Promise<requestType> {
  return request({
    url: "/api/user/updateUserAdult",
    method: "post",
    data,
  });
}

export function requestupdateUserInfo(data: {
  userId: string;
  passwd: string;
  email: string;
  tel: string;
}): Promise<requestType> {
  return request({
    url: "/api/user/updateUserInfo",
    method: "post",
    data,
  });
}
export function requestgetOrderHistory(data: {
  userId: string;
  page: number;
}): Promise<requestType> {
  return request({
    url: "/api/user/getOrderHistory",
    method: "post",
    data,
  });
}
export function requestgetVodList(data: {
  userId: string;
}): Promise<requestType> {
  return request({
    url: "/api/user/getVodList",
    method: "post",
    data,
  });
}
