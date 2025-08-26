import request from "@/utils/request.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface requestType<T = any> {
  code: number;
  data: T;
}

// export function requestMemberFileUpload(data) {
//   return request({
//     url: "/api/private/file/memberFileUpload",
//     method: "post",
//     data,
//     files: true,
//   })
// }

export function requestLogin(data: {
  id: string;
  passwd: string;
}): Promise<requestType> {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
}

export function requestUserInfo(): Promise<requestType> {
  return request({
    url: "/api/auth/info",
    method: "post",
  });
}

export function requestGetCodeList(): Promise<requestType> {
  return request({
    url: "/api/common/getCodes",
    method: "post",
  });
}
