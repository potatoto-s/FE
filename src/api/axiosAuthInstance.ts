import axios from 'axios';
import useAuthStore from '../stores/authStore';

const axiosAuthInstance = axios.create({
  baseURL: '', // 실제 API 주소로 수정
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
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

    // Access Token 만료 처리
    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 재시도 방지 플래그
    ) {
      originalRequest._retry = true;

      try {
        // Refresh Token을 localStorage에서 가져옴
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.');

        const { data } = await axios.post('/api/token/refresh/', {
          refresh: refreshToken,
        });

        // 새 Access Token 저장
        const newAccessToken = data.access;
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 재발급된 Access Token으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAuthInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);

        // 토큰 갱신 실패 시 로그아웃 처리 및 로그인 페이지로 이동
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
