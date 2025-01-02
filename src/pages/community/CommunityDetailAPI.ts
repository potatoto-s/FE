import axiosAuthInstance from '../../api/axiosAuthInstance';
import axiosInstance from '../../api/axiosInstance';

export const fetchPostDetail = async (postId: string) => {
  const response = await axiosInstance.get(`/api/posts/${postId}/`);
  return response.data;
};

// 댓글 작성 함수
export const createComment = async (postId: string, content: string) => {
  const response = await axiosAuthInstance.post(
    `/api/comment/${postId}/comments/create/`,
    content
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
    content
  );
  return response.data;
};

// 댓글 삭제 함수
export const deleteComment = async (commentId: number) => {
  await axiosAuthInstance.delete(`/api/comment/${commentId}/delete/`);
};

// 게시글 좋아요 토글 함수
export const toggleLikePost = async (is_liked: boolean, postId: number) => {
  const response = await axiosAuthInstance.post(`/api/posts/${postId}/like/`, {
    is_liked,
  });
  return response.data;
};

// axios => axiosAuthInstance 로 바꾸기
// 3.3 게시글 상세조회 author.id 받아와서 비교 수정 및 삭제 버튼 보여주기
// contente 받아와서 넘겨주기

// 전역 상태에 유저 아이디, 게시글 상세 조회 응답 데이터에 있는
// 작성자 아이디 버튼 UI 보여주기

// 좋아요 API 로직
// 상세 게시글 조회할때 좋아요 누른사람인지 아닌지 구별? 백엔드에게 물어보기
// 게시글 좋아요 토글 에 답이없고 응답만있음
// 댓글 수정 API 있는지 체크

// 게시글 상세 조회 - is_liked 필드가 구현되어 있어서
// 사용자 좋아요 여부 확인 가능합니다

// 게시글 좋아요 토글 - Response로 {"is_liked" : is_liked, "message": "좋아요가
// 처리되었습니다"} 를 반환해서 현재 좋아요 상태를 제공하고 있습니다

// 댓글 수정 PATCH 메서드로 구현되어 있습니다. 저번에 제가 제준님한테 여쭤본거 답변받은거
