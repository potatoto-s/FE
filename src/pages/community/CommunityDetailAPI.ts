import axiosAuthInstance from '../../api/axiosAuthInstance';
import axiosInstance from '../../api/axiosInstance';

// 게시글 작성 함수
export const fetchPostDetail = async (postId: number | string) => {
  const response = await axiosInstance.get(`/api/posts/${postId}/`);
  return response.data;
};

// 게시글 삭제 함수
export const deletePost = async (postId: number) => {
  await axiosAuthInstance.delete(`/api/posts/${postId}/delete/`);
};

// 게시글 수정 함수
export const updatePost = async (
  postId: number,
  updatedContent: { title: string; content: string }
) => {
  const response = await axiosAuthInstance.patch(
    `/api/posts/${postId}/update/`,
    { updatedContent }
  );
  return response.data;
};

// 댓글 작성 함수
export const createComment = async (postId: number, content: string) => {
  const response = await axiosAuthInstance.post(
    `/api/comment/${postId}/comments/create/`,
    { content }
  );
  return response.data;
};

// 댓글 수정 함수
export const updateComment = async (
  commentId: number, // 수정할 댓글 ID
  content: string
) => {
  const response = await axiosAuthInstance.patch(
    `/api/comment/${commentId}/update/`,
    { content }
  );
  return response.data;
};

// 댓글 삭제 API 함수
export const deleteComment = async (comment_id: number) => {
  await axiosAuthInstance.delete(`/api/comment/${comment_id}/delete/`);
};

// 게시글 좋아요 토글 함수
export const toggleLikePost = async (is_liked: boolean, postId: number) => {
  const response = await axiosAuthInstance.post(`/api/posts/${postId}/like/`, {
    is_liked,
  });
  return response.data;
};

// 게시글 작성 이미지 렌더링 확인용
export const createPost = async (data: FormData) => {
  const response = await axiosAuthInstance.post('/api/posts/create/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
