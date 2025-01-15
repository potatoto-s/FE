import type { FormData, ErrorState } from './CommunityPostTypes';

export const initFormData: FormData = {
  category: 'ALL',
  title: '',
  content: '',
  images: [],
};

export const ERROR_MESSAGES = {
  categoryRequired: '카테고리를 선택해야 합니다.',
  contentMinLength: '내용은 최소 10자 이상이어야 합니다.',
  maxFileLimit: '최대 3개의 파일만 업로드 가능합니다.',
  imageFileOnly: '이미지 파일만 업로드 가능합니다.',
};

export const initError: ErrorState = {
  category: null,
  content: null,
  image: null,
};
