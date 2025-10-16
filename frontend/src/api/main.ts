import request from "@/utils/request.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface requestType<T = any> {
  code: number;
  data: T;
  msg: string;
}

export function requestGetAvailableMovieList(): Promise<requestType> {
  return request({
    url: "/api/main/getAvailableMovieList",
    method: "post",
  });
}
export function requestGetPopularityMovieList(): Promise<requestType> {
  return request({
    url: "/api/main/getPopularityMovieList",
    method: "post",
  });
}
export function requestGetRandomMovieList(): Promise<requestType> {
  return request({
    url: "/api/main/getRandomMovieList",
    method: "post",
  });
}
export function requestGetMovieList(data: {
  genreTpcd: string;
  keyword: string;
  page: string;
}): Promise<requestType> {
  return request({
    url: "/api/main/getMovieList",
    method: "post",
    data,
  });
}
export function requestGetMovieDetail(data: {
  movieCode: string;
}): Promise<requestType> {
  return request({
    url: "/api/main/getMovieDetail",
    method: "post",
    data,
  });
}
export function requestInsertOrderHistory(data: {
  orderCode: string;
  userId: string;
  movieCode: string;
  price: number;
  orderTpye: string;
}): Promise<requestType> {
  return request({
    url: "/api/main/insertOrderHistory",
    method: "post",
    data,
  });
}
