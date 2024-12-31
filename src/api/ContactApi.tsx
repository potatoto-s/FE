import axiosInstance from './axiosInstance';

export const contactApi = async (data: any) => {
  try {
    await axiosInstance.post('/contact/', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      organizationName: data.organizationName,
      prefered_reply: data.prefered_reply,
    });
  } catch (error) {
    throw new Error('API 요청 실패');
  }
};
