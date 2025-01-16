import axiosAuthInstance from '@api/axiosAuthInstance';

export const getPostById = async (id: string) => {
  try {
    const response = await axiosAuthInstance.get(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch post data:', error);
  }
};

export const createPost = async (payload: FormData) => {
  try {
    const response = await axiosAuthInstance.post(
      `/api/posts/create/`,
      payload,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create post:', error);
  }
};

export const updatePost = async (id: string, payload: FormData) => {
  try {
    const response = await axiosAuthInstance.patch(
      `/api/posts/${id}/update/`,
      payload,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update post:', error);
  }
};

export const deletePost = async (id: string) => {
  try {
    const response = await axiosAuthInstance.delete(`/api/posts/${id}/delete/`);
    return response.status;
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
};
