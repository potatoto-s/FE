import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hands.p-e.kr/', // 실제 API 주소로 수정
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
