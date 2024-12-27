import axiosAuthInstance from './axiosAuthInstance';

// 로그인 API
export const loginApi = async (email: string, password: string) => {
  const response = await axiosAuthInstance.post('/api/login/', {
    email,
    password,
  });
  return response.data; // { access, refresh, user }
};
