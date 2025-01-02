import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '/api', // URK 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 게시글 상세 조회 함수
export const fetchPostDetail = async (postId: string) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data; // 게시글 데이터를 반환
  // 이 데이터에서 author.id를 받아와서 사용자 비교
};

// 댓글 작성 함수
export const createComment = async (
  postId: number, // 게시글 ID
  comment: {
    content: string; // 댓글 내용
    author: {
      // 댓글 작성자 정보
      id: number; // 작성자 ID
      nickname: string; // 작성자 닉네임
      role: string; // 작성자 기업 | 공방 표시
      companyName?: string; // 작성자 회사명
    };
  }
) => {
  const token = localStorage.getItem('accessToken'); // 액세스 토큰을 로컬 스토리지에서 가져옴
  // 토큰 필요한 이유 사용자가 댓글 작성하거나 수정 및 삭제 하기 위함

  const response = await axiosInstance.post(
    `/posts/${postId}/comments`,
    comment,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data; // 작성된 댓글 데이터를 반환
};

// 댓글 수정 함수
export const updateComment = async (
  postId: number, // 게시글 ID
  commentId: number, // 수정할 댓글 ID
  updatedComment: { content: string } // 수정된 댓글 내용
) => {
  const token = localStorage.getItem('accessToken');

  const response = await axiosInstance.patch(
    `/posts/${postId}/comments/${commentId}`,
    updatedComment, // 요청 바디에 수정된 댓글 내용을 포함
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data; // 수정된 댓글 데이터를 반환
};

// 댓글 삭제 함수
export const deleteComment = async (commentId: number) => {
  const token = localStorage.getItem('accessToken'); // 액세스 토큰을 로컬 스토리지에서 가져오기

  await axiosInstance.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 게시글 좋아요 토글 함수
export const toggleLikePost = async (postId: number) => {
  const token = localStorage.getItem('accessToken'); // 토큰 로컬스토리지에 가져오기

  const response = await axiosInstance.post(
    `/posts/${postId}/likes`, // 좋아요 토글 API 엔드포인트
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data; // 데이터 반환
};

// 게시글 좋아요 상태 확인 함수
export const checkUserLikedPost = async (postId: number) => {
  const token = localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/posts/${postId}/likes/ststus`, {
    // 좋아요 상태 확인 API 엔드포인트
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 좋아요 API 로직
// 상세 게시글 조회할때 좋아요 누른사람인지 아닌지 구별? 백엔드에게 물어보기
// 게시글 좋아요 토글 에 답이없고 응답만있음
// 댓글 수정 API 있는지 체크

// axios => axiosAuthInstance 로 바꾸기
// 3.3 게시글 상세조회 author.id 받아와서 비교 수정 및 삭제 버튼 보여주기
// contente 받아와서 넘겨주기

// 전역 상태에 유저 아이디, 게시글 상세 조회 응답 데이터에 있는
// 작성자 아이디 버튼 UI 보여주기

// 게시글 상세 조회 - is_liked 필드가 구현되어 있어서
// 사용자 좋아요 여부 확인 가능합니다

// 게시글 좋아요 토글 - Response로 {"is_liked" : is_liked, "message": "좋아요가
// 처리되었습니다"} 를 반환해서 현재 좋아요 상태를 제공하고 있습니다

// 댓글 수정 PATCH 메서드로 구현되어 있습니다.
