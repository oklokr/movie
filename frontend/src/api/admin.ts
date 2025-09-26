import request from "@/utils/request.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface requestType<T = any> {
  code: number;
  data: T;
  msg: string;
}

export function requestGetUserList(data: {
  userId: string;
  userTpcd: string;
  page: number;
}): Promise<requestType> {
  return request({
    url: "/api/admin/getUserList",
    method: "post",
    data,
  });
}

export function requestGetUserInfo(data: {
  userId: string | null;
}): Promise<requestType> {
  return request({
    url: "/api/admin/getUserInfo",
    method: "post",
    data,
  });
}

export function requestChangeUserTpcd(data: {
  userId: string | null;
  userTpcd: string | null;
}): Promise<requestType> {
  return request({
    url: "/api/admin/changeUserTpcd",
    method: "post",
    data,
  });
}

export function requestChangeUserPasswd(data: {
  userId: string | null;
}): Promise<requestType> {
  return request({
    url: "/api/admin/changeUserPasswd",
    method: "post",
    data,
  });
}

export function requestGetMovieInfoList(data: {
  movieName: string | null;
  page: number;
}): Promise<requestType> {
  return request({
    url: "/api/admin/getMovieInfoList",
    method: "post",
    data,
  });
}

export function requestGetCreatorList(): Promise<requestType> {
  return request({
    url: "/api/admin/getCreatorList",
    method: "post",
  });
}

export function requestGetMovieInfo(data: {
  movieId: string;
}): Promise<requestType> {
  return request({
    url: "/api/admin/getMovieInfo",
    method: "post",
    data,
  });
}
