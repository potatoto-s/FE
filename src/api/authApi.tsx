import axios from 'axios';

// 로그인 API
export const loginApi = async (email: string, password: string) => {
  const response = await axios.post('/api/login/', {
    email,
    password,
  });
  return response.data; // { access, refresh, user }
};
