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

export function requestInsertMovie(data: {
  movieCode: string;
  genreCodeA: string | null;
  genreCodeB: string | null;
  genreCodeC: string | null;
  movieName: string;
  directCodeA: string;
  directCodeB: string | null;
  actorCodeA: string;
  actorCodeB: string | null;
  actorCodeC: string | null;
  actorCodeD: string | null;
  actorCodeE: string | null;
  synopsis: string;
  runtime: number;
  ratingTpcd: string;
  // movieRelease: string;
  // teaser: string;
  poster: string;
  background: string;
  price: number;
  discountrate: number;
  vodState: string;
  reservationState: string;
}): Promise<requestType> {
  return request({
    url: "/api/admin/insertMovie",
    method: "post",
    data,
  });
}

export function requestUpdateMovie(data: {
  movieCode: string;
  genreCodeA: string | null;
  genreCodeB: string | null;
  genreCodeC: string | null;
  movieName: string;
  directCodeA: string;
  directCodeB: string | null;
  actorCodeA: string;
  actorCodeB: string | null;
  actorCodeC: string | null;
  actorCodeD: string | null;
  actorCodeE: string | null;
  synopsis: string;
  runtime: number;
  ratingTpcd: string;
  // movieRelease: string;
  // teaser: string;
  poster: string;
  background: string;
  price: number;
  discountrate: number;
  vodState: string;
  reservationState: string;
}): Promise<requestType> {
  return request({
    url: "/api/admin/updateMovie",
    method: "post",
    data,
  });
}

export function requestGetTheater(data: {
  runDate: string;
}): Promise<requestType> {
  return request({
    url: "/api/admin/getTheater",
    method: "post",
    data,
  });
}
export function requestInsertTheater(data: {
  runDate: string;
}): Promise<requestType> {
  return request({
    url: "/api/admin/insertTheater",
    method: "post",
    data,
  });
}
export function requestInsertRunSchedule(data: {
  theaterCode: string;
  movieCode: string;
  runDate: string;
  startTime: string;
  endTime: string;
  price: number;
  discountrate: number;
}): Promise<requestType> {
  return request({
    url: "/api/admin/insertRunSchedule",
    method: "post",
    data,
  });
}
