import axios from 'axios';
import useAuthStore from '../stores/authStore';

const axiosAuthInstance = axios.create({
  baseURL: 'https://hands.p-e.kr', // 실제 API 주소로 수정
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor
axiosAuthInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Access Token 만료 처리 (401 오류)
    if (error.response?.status === 401) {
      try {
        const refreshToken = useAuthStore.getState();
        if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.');

        // Refresh Token을 사용하여 Access Token 재발급 요청
        const { data } = await axios.post(
          'https://hands.p-e.kr/token/refresh/',
          {
            refresh: refreshToken,
          }
        );

        // 새로운 Access Token , Refresh Token 저장
        const newAccessToken = data.access;
        const newRefreshToken = data.refresh;
        useAuthStore.getState().setAccessToken(newAccessToken);
        useAuthStore.getState().setRefreshToken(newRefreshToken);

        // 재발급된 Access Token으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAuthInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);

        // 로그아웃 처리
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
