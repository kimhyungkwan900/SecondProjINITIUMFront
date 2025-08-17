import axios from "axios";

// 공통 axios 인스턴스 (쿠키 전송)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 401 처리 전략 (쿠키 기반):
 * - /auth/refresh 로 새 AccessToken 쿠키를 재발급
 * - 성공 시 원요청 1회 재시도
 * - 동시 다발 401은 refreshPromise를 공유해 중복 호출 방지
 */
let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;

    // 네트워크 에러 등
    if (!response) {
      return Promise.reject(error);
    }

    const originalRequest = config;
    const is401 = response.status === 401;
    const isLogin = originalRequest?.url?.includes("/auth/login");
    const isRefresh = originalRequest?.url?.includes("/auth/refresh");

    // 401 & (로그인/리프레시 요청 아님) & (재시도 전)
    if (is401 && !isLogin && !isRefresh && !originalRequest.__isRetryRequest) {
      try {
        if (!refreshPromise) {
          // refresh는 인터셉터 없는 새 요청으로 수행 (순환 방지)
          refreshPromise = axios
            .post(
              `${axiosInstance.defaults.baseURL}/auth/refresh`,
              {},
              { withCredentials: true, headers: { "Content-Type": "application/json" } }
            )
            .finally(() => {
              refreshPromise = null;
            });
        }
        // 모두가 같은 refreshPromise를 기다리게 함
        await refreshPromise;

        // 새 쿠키가 세팅되었으므로 원요청을 1회 재시도
        originalRequest.__isRetryRequest = true;
        return axiosInstance(originalRequest);
      } catch (e) {
        // refresh 실패 → 그대로 에러 전파 (상위에서 로그아웃 처리 등)
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
