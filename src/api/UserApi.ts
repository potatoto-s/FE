import axiosAuthInstance from './axiosAuthInstance';

export const fetchUserProfile = async () => {
  try {
    const reponse = await axiosAuthInstance.get(`/api/users/profile/`);
    return reponse.data;
  } catch (error) {
    console.log('사용자 프로필을 가져오는 중 오류 발생', error);
    throw error;
  }
};
