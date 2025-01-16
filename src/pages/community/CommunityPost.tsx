import { IoChevronBackOutline } from 'react-icons/io5';
import { GoFileSymlinkFile } from 'react-icons/go';
import ConfirmModal from '@components/modal/ConfirmModal';
import useCommunityPostState from '@pages/community/usePostState';
import useCommunityPostHook from '@pages/community/usePostHook';
import { FormType } from '@pages/community/CommunityPostTypes';

type Props = {
  type: FormType;
};

function CommunityPost({ type }: Props) {
  const {
    fileInputRef,
    formData,
    error,
    setFormData,
    setError,
    pageType,
    imageInputResetKey,
    setImageInputResetKey,
    showDeleteModal,
    setShowDeleteModal,
  } = useCommunityPostState({ type });

  const {
    handleChange,
    handleSave,
    handleButtonClick,
    handleImageChange,
    handleDeleteFile,
    handleDeleteClick,
    closeDeleteModal,
    handleDelete,
  } = useCommunityPostHook({
    fileInputRef,
    formData,
    error,
    setFormData,
    setError,
    pageType,
    imageInputResetKey,
    setImageInputResetKey,
    showDeleteModal,
    setShowDeleteModal,
  });

  return (
    <div className="mx-auto min-h-screen py-20 px-4 bg-[#FFFBEF] max-sm:h-auto">
      <div className="flex items-center mb-8 text-2xl font-bold text-gray-600 cursor-pointer ">
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
            <option value="ALL" disabled>
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
          {error.content && (
            <div className="text-red-500 text-sm mt-2">{error.content}</div>
          )}
        </div>

        {/* 이미지 첨부 */}
        <div className="flex justify-between p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#F28749] w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-start justify-center w-full max-w-[75%]">
            {formData.images?.length ? (
              formData.images.map((file, index) => (
                <div key={index} className="truncate w-full text-[#a9a9a9] ">
                  {`${index + 1}. ` +
                    (file instanceof File ? file.name : file.image_url)}
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
              {/* 화면 크기에 따라 버튼 텍스트 변경 */}
              <span className="hidden sm:inline">이미지첨부</span>
              <span className="inline sm:hidden">사진첨부</span>
            </button>
            <input
              type="file"
              key={imageInputResetKey}
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
          {formData.images?.map((file, index) => (
            <li
              key={index}
              onClick={() => handleDeleteFile([file])}
              className="h-60 w-64 flex justify-center items-center rounded bg-[#EFEFEF] max-sm:w-full"
            >
              <img
                src={
                  file instanceof File
                    ? URL.createObjectURL(file)
                    : file.image_url
                }
                alt={file instanceof File ? file.name : file.image_url}
                className="w-full h-full rounded object-cover"
              />
            </li>
          ))}

          {/* 기본 이미지 아이콘은 length가 3에 도달할 때까지 표시 */}
          {[...Array(3 - (formData.images?.length || 0))].map((_, index) => (
            <li
              key={index}
              className="h-60 w-64 flex justify-center items-center rounded bg-[#EFEFEF] max-sm:w-full"
            >
              <GoFileSymlinkFile className="h-20 w-20" />
            </li>
          ))}
        </div>

        {/* 등록/취소 버튼 */}
        <div className="flex justify-center gap-4">
          {pageType === 'post' ? (
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
