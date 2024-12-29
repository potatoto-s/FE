import axios from 'axios';

const API_URL = '/api'; // API 주소

export const setToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post(`${API_URL}/refresh-token`, {
    refreshToken,
  });

  const { accessToken } = response.data;
  setToken(accessToken, refreshToken);
  return accessToken;
};

type RequestFunc = (token: string, ...args: any[]) => Promise<any>;

const apiRequest = async (
  requestFunc: RequestFunc,
  ...args: any[]
): Promise<any> => {
  let accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error('Access token is not available');
  }

  try {
    return await requestFunc(accessToken, ...args);
  } catch (error: any) {
    // error의 타입을 any로 지정
    if (error.response && error.response.status === 401) {
      // 엑세스 토큰 만료, 리프레시 토큰으로 갱신
      accessToken = await refreshAccessToken();
      return await requestFunc(accessToken, ...args); // 재시도
    }
    throw error; // 다른 오류는 그대로 던진다
  }
};

// 댓글 수정 함수 추가
export const updateComment = async (
  postId: number,
  commentId: number,
  updatedComment: { content: string }
) => {
  return await apiRequest(async (token) => {
    const response = await axios.patch(
      `${API_URL}/posts/${postId}/comments/${commentId}`,
      updatedComment,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data; // 수정된 댓글 데이터 반환
  });
};

// 사용자 프로필 조회
export const fetchUserProfile = async () => {
  return await apiRequest(async (token) => {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // 사용자 데이터 반환
  });
};

// 게시글 상세 조회
export const fetchPostDetail = async (postId: string) => {
  return await apiRequest(async (token) => {
    const response = await axios.get(`${API_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // 게시글 데이터 반환
  });
};

// 댓글 작성
export const createComment = async (
  postId: number,
  comment: {
    content: string;
    author: {
      id: number;
      nickname: string;
      role: string;
      companyName?: string;
    };
  }
) => {
  return await apiRequest(async (token) => {
    const response = await axios.post(
      `${API_URL}/posts/${postId}/comments`,
      comment,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data; // 작성된 댓글 데이터 반환
  });
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  return await apiRequest(async (token) => {
    await axios.delete(`${API_URL}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });
};
