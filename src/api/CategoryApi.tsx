import axiosInstance from './axiosAuthInstance';

export const fetchCategoryPostList = async (category?: string) => {
  try {
    // 카테고리별 데이터 요청
    const endpoint = category
      ? `/api/posts/?category=${category}` // 특정 카테고리
      : '/api/posts/'; // 전체 데이터
    const response = await axiosInstance.get(endpoint);
    return response.data.data; // 데이터 반환
  } catch (error) {
    throw error; // 오류 처리
  }
};
