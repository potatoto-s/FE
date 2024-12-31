import axiosInstance from './axiosInstance';

// 로그인 API
export const loginApi = async (email: string, password: string) => {
  const response = await axiosInstance.post('https://hands.p-e.kr/login/', {
    email,
    password,
  });
  return response.data; // { access, refresh, user }
};
