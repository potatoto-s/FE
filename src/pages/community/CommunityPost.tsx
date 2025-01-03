type FormData = {
  category: string;
  title: string;
  content: string;
  images: File[] | null; // image는 null 또는 File 타입
};

type ErrorState = {
  category: string | null;
  image: string | null | undefined;
};

import { IoChevronBackOutline } from 'react-icons/io5';
import { GoFileSymlinkFile } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import ConfirmModal from '../../components/modal/ConfirmModal';
import { useNavigate, useParams } from 'react-router-dom';
import axiosAuthInstance from '../../api/axiosAuthInstance';

function CommunityPost({ type }: { type: 'post' | 'edit' }) {
  const [formData, setFormData] = useState<FormData>({
    category: '1',
    title: '',
    content: '',
    images: [],
  });

  const ERROR_MESSAGES = {
    categoryRequired: '카테고리를 선택해야 합니다.',
    maxFileLimit: '최대 3개의 파일만 업로드 가능합니다.',
    imageFileOnly: '이미지 파일만 업로드 가능합니다.',
  };

  const [error, setError] = useState<ErrorState>({
    category: null,
    image: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [pagetype, setPageType] = useState<'post' | 'edit'>(type);

  const [files, setFiles] = useState<File[]>([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 버튼 클릭 시 type 전환
  const toggleType = () => {
    if (pagetype === 'post') {
      setPageType('edit');
      navigate(`/communitypost/${id || '1'}`);
    } else {
      setPageType('post');
      navigate(`/communitypost`);
    }
  };

  // PATCH
  useEffect(() => {
    console.log('pagetype: ' + pagetype);
    if (pagetype !== 'post') {
      axiosAuthInstance
        .get(`/api/posts/${id || '1'}`)
        .then((response) => {
          const data = response.data;
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
  }, [pagetype]); // id가 변경될 때마다 실행

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
    // 유효성 검사: 카테고리가 "1"이면 저장 불가
    if (formData.category === '1') {
      setError((prevError) => ({
        ...prevError,
        category: ERROR_MESSAGES.categoryRequired,
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
      if (pagetype === 'post') {
        response = await axiosAuthInstance.post(`/api/posts/create/`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('respose:', response.data);
        console.log('저장 데이터:', formData);
        alert('게시물 등록이 완료되었습니다.');

        navigate(`/communitydetail/${response.data.id}`);
      } else if (pagetype === 'edit') {
        response = await axiosAuthInstance.patch(
          `/api/posts/${id}/update/`,
          payload,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        console.log('수정 데이터:', formData);
        alert('게시물 수정이 완료되었습니다.');

        navigate(`/communitydetail/${response.data.id}`);
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
        setError((prevError) => ({
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
    try {
      //test
      console.log('id' + `${id}`);
      const response = await axiosAuthInstance.delete(
        `/api/posts/${id}/delete/`
      );
      // 응답 객체에서 status와 statusText에 접근
      const { status } = response;
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

    console.log('삭제 로직 실행');
  };

  return (
    <div className="mx-auto min-h-screen py-20 px-4 bg-[#FFFBEF] max-sm:h-auto">
      <div className="flex items-center mb-8">
        <IoChevronBackOutline /> 게시판
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow"
      >
        {/* 카테고리 선택 */}
        <div className="mb-4">
          <select
            id="category"
            name="category"
            value={formData.category} // 현재 상태값에 맞게 설정
            onChange={handleChange} // handleChange 함수 연결
            required
            aria-label="카테고리 선택"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2  focus:ring-[#F28749]"
          >
            <option value="1" disabled>
              선택
            </option>
            <option value="BALLOON">풍선/페이퍼아트</option>
            <option value="GIFT">선물포장/보자기</option>
            <option value="WOOD">목공/도자기/가죽</option>
            <option value="RESIN">레진/비즈공예</option>
            <option value="DIFFUSER">디퓨져/캔들/석고방향제</option>
            <option value="RATTAN">라탄/마크라메</option>
            <option value="FLOWER">플라워</option>
            <option value="TOTAL">토탈공예</option>
          </select>
          {error.category && (
            <div className="text-red-500 text-sm mt-2">{error.category}</div>
          )}
        </div>

        {/* 제목 입력 */}
        <div className="mb-4">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleChange}
            aria-label="제목"
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F28749] "
          />
        </div>

        {/* 내용 입력 */}
        <div className="mb-4">
          <textarea
            id="content"
            name="content"
            placeholder="내용을 입력하세요"
            aria-label="내용"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F28749] resize-none h-[500px] overflow-auto"
          ></textarea>
        </div>

        {/* 이미지 첨부 */}
        <div className="flex justify-between p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#F28749]">
          <div className="flex flex-col items-start justify-center">
            {files.length > 0 ? (
              files.map((file, index) => (
                <div key={index} className="text-[#a9a9a9]">
                  {`${index + 1}. ` + file.name}
                </div>
              ))
            ) : (
              <p className=" text-[#a9a9a9]">선택된 파일 없음</p>
            )}
          </div>
          <div className="ml-4 flex items-center">
            <button
              onClick={handleButtonClick}
              className=" justify-end p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F28749] cursor-pointer"
            >
              이미지첨부
            </button>
            <input
              type="file"
              key={fileInputKey}
              id="image"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        {/* 사진 개수 오류 처리: 이미지 미리보기 영역 위에 */}
        {error.image && (
          <div className="text-red-500 text-sm mt-2">{error.image}</div>
        )}
        {/* 첨부된 이미지 미리보기 */}
        <div className="flex justify-between mb-4 gap-4 max-sm:flex-col">
          {/* 이미지 미리보기 */}
          {files.map((file, index) => (
            <li
              key={index}
              onClick={() => handleDeleteFile(file)}
              className="h-60 w-64 flex justify-center items-center rounded bg-[#EFEFEF] max-sm:w-full"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full rounded object-cover"
              />
            </li>
          ))}

          {/* 기본 이미지 아이콘은 length가 3에 도달할 때까지 표시 */}
          {[...Array(3 - files.length)].map((_, index) => (
            <li
              key={index}
              className="h-60 w-64 flex justify-center items-center rounded bg-[#EFEFEF] max-sm:w-full"
            >
              <GoFileSymlinkFile className="h-20 w-20" />
            </li>
          ))}
        </div>

        {pagetype === 'post' && <button onClick={toggleType}>edit 전환</button>}
        {pagetype === 'edit' && <button onClick={toggleType}>post 전환</button>}
        {/* 등록/취소 버튼 */}
        <div className="flex justify-center gap-4">
          {pagetype === 'post' ? (
            <>
              <button
                type="submit"
                // onClick={handleSave}
                className="text-base px-8 py-2 text-white bg-[#F28749] rounded hover:bg-[#d8743e] transition duration-300"
              >
                등록
              </button>
              <button
                type="reset"
                className="text-base px-8 py-2 text-[#F28749] border border-[#F28749] rounded-md hover:bg-[#f28749] hover:text-white transition duration-300"
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="text-base px-8 py-2 text-white bg-[#F28749] rounded hover:bg-[#d8743e] transition duration-300"
              >
                수정
              </button>
              <button
                type="reset"
                onClick={handleDeleteClick}
                className="text-base px-8 py-2 text-[#F28749] border border-[#F28749] rounded-md hover:bg-[#f28749] hover:text-white transition duration-300"
              >
                삭제
              </button>
              {showDeleteModal && (
                <ConfirmModal
                  handleDelete={handleDelete}
                  closeDeleteModal={closeDeleteModal}
                />
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
}
export default CommunityPost;
