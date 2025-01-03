import axiosAuthInstance from './axiosAuthInstance';

// 사용자 프로필 업데이트 API
export const updateUserProfile = async (updatedData: {
  name?: string;
  nickname?: string;
  phone?: string;
  company_name?: string;
  workshop_name?: string;
}) => {
  try {
    const response = await axiosAuthInstance.put('/api/profile/', updatedData);
    return response.data; // 서버에서 응답된 데이터를 반환
  } catch (error) {
    console.error('사용자 프로필 업데이트 중 오류 발생:', error);
    throw error; // 오류를 호출한 쪽으로 전달
  }
};
