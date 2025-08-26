import axios from "axios";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: "http://localhost:8080",
  timeout: 60000 * 10,
  withCredentials: true,
});

const pendingRequests = {};

const setInterceptors = (service) => {
  // request interceptor
  service.interceptors.request.use(
    (config) => {
      if (pendingRequests[config.url]) {
        pendingRequests[config.url].cancel(config.url);
        delete pendingRequests[config.url];
      }

      const cancelTokenSource = axios.CancelToken.source();
      config.cancelToken = cancelTokenSource.token;
      pendingRequests[config.url] = cancelTokenSource;
      config.data = config.data || {};

      // 파일 업로드 처리 개선
      if (config.files) {
        config.headers["Content-Type"] = "multipart/form-data";

        // FormData가 이미 전달된 경우 그대로 사용
        if (config.data instanceof FormData) {
          // FormData는 그대로 사용
        } else if (Array.isArray(config.data)) {
          // 배열 형태의 파일 데이터 처리 (기존 로직)
          const frm = new FormData();
          for (const item of config.data) {
            if (item.uid && item.originFileObj) {
              frm.append(item.uid, item.originFileObj);
            }
          }
          config.data = frm;
        } else {
          // 객체 형태의 데이터를 FormData로 변환
          const frm = new FormData();
          for (const [key, value] of Object.entries(config.data)) {
            frm.append(key, value);
          }
          config.data = frm;
        }
      }

      // DELETE 메서드 처리
      if (config.method === "delete" && config.data) {
        // DELETE 요청에서 데이터가 있는 경우 JSON으로 처리
        if (!(config.data instanceof FormData)) {
          config.headers["Content-Type"] = "application/json";
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return service;
};

const serviceInterceptors = setInterceptors(service);

const forbiddenFunc = (code) => {
  if ([401, 403].includes(code)) {
    // window.localStorage.removeItem("jwtToken");
    // window.localStorage.removeItem("id");
    // window.localStorage.removeItem("role");
    console.log("권한이 없는 경우 예외");
    return true;
  }
  return false;
};

serviceInterceptors.interceptors.response.use(
  async (response) => {
    delete pendingRequests[response.config.url];

    // 파일 업로드/삭제 API의 경우 전체 response 반환
    if (response.config.url.includes("/api/files/")) {
      return response;
    }

    // 일반 API의 경우 응답 구조 안전하게 체크
    if (
      response.data &&
      typeof response.data === "object" &&
      "code" in response.data
    ) {
      const { status } = response;
      if (forbiddenFunc(status)) {
        return Promise.reject(new Error("logout"));
      }
    }

    return response.data;
  },
  (error) => {
    if (!error.response) return Promise.reject(error);

    if (error.response?.status === 401) {
      console.log("로그인이 필요한 서비스입니다");
      window.location.href = "/login";
    }
    if (axios.isCancel(error)) {
      delete pendingRequests[error.message];
      return Promise.resolve(error);
    }

    const { status } = error.response;
    if (forbiddenFunc(parseInt(status))) {
      return Promise.reject(error);
    }

    if (error.msg === "success") {
      return Promise.resolve(error);
    }

    return Promise.reject(error);
  }
);

export default service;
export { setInterceptors, pendingRequests };
