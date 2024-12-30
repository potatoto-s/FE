import axios from 'axios';

// 로그인 API
export const loginApi = async (email: string, password: string) => {
  const response = await axios.post('https://hands.p-e.kr/login/', {
    email,
    password,
  });
  return response.data; // { access, refresh, user }
};
