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
  page: number;
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

export function requestGetScheduleList(data: {
  runDate: string;
  movieCode: string;
}): Promise<requestType> {
  return request({
    url: "/api/main/getScheduleList",
    method: "post",
    data,
  });
}
export function requestGetAvailableSeats(data: {
  movieCode: string;
  scheduleCode: string;
  theaterCode: string;
}): Promise<requestType> {
  return request({
    url: "/api/main/getAvailableSeats",
    method: "post",
    data,
  });
}
export function requestInsertReservation(data: {
  orderCode: string;
  userId: string;
  movieCode: string;
  price: number;
  reserveDate: string;
  theaterCode: string;
  scheduleCode: string;
  seatCode: string[];
}): Promise<requestType> {
  return request({
    url: "/api/main/insertReservation",
    method: "post",
    data,
  });
}
