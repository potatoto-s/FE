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

    // Access Token 만료 처리 (401 오류)
    if (
      error.response?.status === 401 && // Unauthorized
      !originalRequest._retry // 이미 재시도한 요청인지 확인
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.');

        // Refresh Token을 사용하여 Access Token 재발급 요청
        const { data } = await axios.post('/api/token/refresh/', {
          refresh: refreshToken,
        });

        // 새로운 Access Token 저장
        const newAccessToken = data.access;
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 재발급된 Access Token으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAuthInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);

        // 로그아웃 처리
        useAuthStore.getState().logout();
        window.location.href = '/login'; // 로그인 페이지로 이동
      }
    }

    return Promise.reject(error); // 그 외 에러 처리
  }
);

export default axiosAuthInstance;
