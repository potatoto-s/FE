import axiosInstance from '../api/axiosAuthInstance';

export const fetchPostList = async (params = {}) => {
  try {
    console.log('요청 파라미터:', params);
    const response = await axiosInstance.get('/api/posts/', { params });
    console.log('API 응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};
