import axiosInstance from '@api/axiosInstance';

export const contactApi = async (data: any, type: string) => {
  try {
    await axiosInstance.post('api/contacts/', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      content: data.content,
      inquiry_type: type,
      organization_name: data.organization_name,
      preferred_contact: data.preferred_contact,
    });
  } catch (error) {
    throw new Error('API 요청 실패');
  }
};
