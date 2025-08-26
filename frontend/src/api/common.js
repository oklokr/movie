import request from "@/utils/request.js";

// export function requestMemberFileUpload(data) {
//   return request({
//     url: "/api/private/file/memberFileUpload",
//     method: "post",
//     data,
//     files: true,
//   })
// }
export function requestLogin(data) {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
}
