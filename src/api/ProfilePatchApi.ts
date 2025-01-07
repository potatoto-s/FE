import axiosAuthInstance from './axiosAuthInstance';

// 사용자 프로필 업데이트 API
export const updateUserProfile = async (updatedData: {
  name: string;
  nickname: string;
  phone: string;
  company_name?: string;
  workshop_name?: string;
}) => {
  try {
    // PATCH 요청 전송
    const response = await axiosAuthInstance.patch(
      '/api/users/profile/',
      updatedData
    );
    return response.data;
  } catch (error: any) {
    console.error('사용자 프로필 업데이트 중 오류 발생:', error);
    throw error;
  }
};
