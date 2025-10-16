import request from "@/utils/request.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface requestType<T = any> {
  code: number;
  data: T;
  msg: string;
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
  userId: string;
  passwd: string;
}): Promise<requestType> {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
}

export function requestLogout(): Promise<requestType> {
  return request({
    url: "/api/auth/logout",
    method: "post",
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

export function requestGetVerification(getId: string) {
  return request({
    url: `https://api.portone.io/identity-verifications/${encodeURIComponent(
      getId
    )}`,
    method: "get",
    headers: {
      Authorization: `PortOne w6LyhMckJqzDQrMvmDeRqWCXkJtvZWWRDPnm8HEOxCTNUTAbfOGuPOI7jSf3N2lsL1R16wVGEAft3kGA`,
    },
  } as Any);
}
