import axiosInstance from './axiosInstance';

// 로그인 API
export const loginApi = async (email: string, password: string) => {
  const response = await axiosInstance.post('/api/login/', {
    email,
    password,
  });
  return response.data; // { access, refresh, user }
};
