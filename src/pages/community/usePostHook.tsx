import { useEffect } from 'react';
import { ERROR_MESSAGES } from '@pages/community/CommunityPostConst';
import type {
  FormType,
  FormData,
  ErrorState,
} from '@pages/community/CommunityPostTypes';
import { getPostById, createPost, updatePost, deletePost } from '@api/PostApi';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  formData: FormData;
  error: ErrorState;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setError: React.Dispatch<React.SetStateAction<ErrorState>>;
  pageType: FormType;
  files: File[];
  fileInputKey: string | number;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setFileInputKey: React.Dispatch<React.SetStateAction<number>>;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function useCommunityPostHook({
  fileInputRef,
  formData,
  setFormData,
  setError,
  pageType,
  files,
  setFiles,
  setFileInputKey,
  setShowDeleteModal,
}: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  // PATCH;
  useEffect(() => {
    console.log('pagetype: ' + pageType);
    if (pageType !== 'post' && id) {
      getPostById(id)
        .then((response) => {
          const data = response;
          setFormData({
            category: data.category,
            title: data.title,
            content: data.content,
            images: Array.isArray(data.images) ? data.images : null,
          }); // 폼 초기값 설정
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [pageType, id]);

  // 입력값 변경 처리
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    //서버 제출 데이터
    setFormData({
      ...formData,
      [name]: value,
    });

    // 에러 상태 초기화: 카테고리 선택 시 초기화
    if (name === 'category' && value !== '1') {
      setError((prevError) => ({ ...prevError, category: null }));
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.category === '1') {
      setError((prevError) => ({
        ...prevError,
        category: ERROR_MESSAGES.categoryRequired,
      }));
      return;
    }

    if (formData.content.length < 10) {
      setError((prevError) => ({
        ...prevError,
        content: ERROR_MESSAGES.contentMinLength,
      }));
      return;
    }

    try {
      const payload = new FormData();
      payload.append('category', formData.category);
      payload.append('title', formData.title);
      payload.append('content', formData.content);
      formData.images?.forEach((image) => {
        payload.append('images', image);
      });
      let response;
      if (pageType === 'post') {
        response = await createPost(payload);
        console.log('응답 데이터:', response);
        alert('게시물 등록이 완료되었습니다.');
        navigate(`/communitydetail/${response.id}`);
      } else if (pageType === 'edit' && id) {
        response = await updatePost(id, payload);
        alert('게시물 수정이 완료되었습니다.');
        navigate(`/communitydetail/${response.id}`);
      }
    } catch {
      alert('게시물 등록 중 오류가 발생했습니다.');
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택 다이얼로그 열기
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // 유효성 검사: 이미지 파일만 허용
      if (selectedFiles.some((file) => !file.type.startsWith('image/'))) {
        setError((prevError) => ({
          ...prevError,
          image: ERROR_MESSAGES.imageFileOnly,
        }));
        return;
      }

      // 유효성 검사: 최대 3개의 파일만 업로드
      if (files.length + selectedFiles.length > 3) {
        setError((prevError: ErrorState) => ({
          ...prevError,
          image: ERROR_MESSAGES.maxFileLimit,
        }));
        return;
      }

      // 파일 목록 상태와 에러 초기화
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      // 파일 중복선택
      setFileInputKey(Date.now());
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...(prevFormData.images || []), ...selectedFiles],
      }));
      setError((prevError) => ({ ...prevError, image: undefined }));
    }
  };

  // 미리보기 클릭 시 해당 파일 삭제
  const handleDeleteFile = (fileToDelete: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images
        ? prevFormData.images.filter((file) => file !== fileToDelete)
        : [],
    }));
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (id) {
      try {
        const status = await deletePost(id);
        if (status === 204) {
          closeDeleteModal(); // 삭제 후 모달 닫기
          navigate('/community');
        } else {
          console.log('삭제 요청 중 오류 발생');
        }
      } catch (err) {
        console.log('삭제 요청 오류 발생', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return {
    handleChange,
    handleSave,
    handleButtonClick,
    handleImageChange,
    handleDeleteFile,
    handleDeleteClick,
    closeDeleteModal,
    handleDelete,
  };
}

export default useCommunityPostHook;
