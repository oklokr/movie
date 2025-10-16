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
