import axiosInstance from '@api/axiosInstance';

// 로그인 API
export const loginApi = async (email: string, password: string) => {
  const response = await axiosInstance.post('/api/users/login/', {
    email,
    password,
  });
  return response.data; // { access, refresh, user }
};
