type FormData = {
  category: string;
  title: string;
  content: string;
  images: File[] | null; // image는 null 또는 File 타입
};

import { IoChevronBackOutline } from 'react-icons/io5';
import { useRef, useState } from 'react';

function CommunityPost() {
  const [formData, setFormData] = useState<FormData>({
    category: '1',
    title: '',
    content: '',
    images: [],
  });

  // input 요소와 button 연결
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 상태 설정: 파일 경로와 파일 이름을 저장할 상태 (UI 정보 저장)
  const [fileInfo, setFileInfo] = useState<
    { fileName: string; filePath: string }[]
  >([]); // 배열로 초기화

  // 이미지 파일 배열 상태
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  };

  // 저장 버튼 클릭 처리
  const handleSave = () => {
    console.log('저장 데이터:', formData);
    // formData를 서버에 저장하거나 다른 작업 수행
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택 다이얼로그 열기
    }
  };

  // 이미지 파일이 선택될 때 호출되는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    // 유효성 검사: 이미지 파일만 허용
    const invalidFiles = selectedFiles.filter(
      (file) => !file.type.startsWith('image/')
    );
    if (invalidFiles.length > 0) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 유효성 검사: 최대 3개의 파일만 업로드
    const newFiles = [...files, ...selectedFiles];
    if (newFiles.length > 3) {
      setError('최대 3개의 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 정보 배열로 생성 (미리보기 URL 포함)
    const fileArray = selectedFiles.map((file) => ({
      fileName: file.name,
      filePath: URL.createObjectURL(file), // 파일의 미리보기 URL
    }));

    // 상태 업데이트: fileInfo는 배열로 저장
    setFileInfo((prevFileInfo) => [...prevFileInfo, ...fileArray]);

    // 파일 목록 상태 업데이트
    setFiles(newFiles); // 새로운 파일 목록 상태로 설정

    // formData.image 배열 업데이트
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [
        // prevFormData.image가 null이면 빈 배열로 처리
        ...(prevFormData.images || []),
        ...selectedFiles,
      ],
    }));
  };

  return (
    <div className="mx-auto min-h-screen w-[81.25rem] pt-[6.25rem] pb-20 bg-[#BBBBBB]">
      <div className="flex items-center px-4">
        <IoChevronBackOutline /> 게시판
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow"
      >
        {/* 카테고리 선택 */}
        <div className="mb-4">
          <select
            id="category"
            name="category"
            defaultValue="1" // 초기값만 설정
            onChange={(event) => {
              console.log('Selected value:', event.target.value);
            }}
            required
            aria-label="카테고리 선택"
            className="block w-full p-2 border rounded focus:outline-none focus:ring-2  focus:ring-[#F28749]"
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
            className="block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F28749] "
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
            className="block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F28749] resize-none h-[500px] overflow-auto"
          ></textarea>
        </div>

        <div className="flex justify-between p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#F28749]">
          {/* 이미지 첨부 */}
          <div className="flex items-center">
            {fileInfo.length > 0 ? (
              fileInfo.map((file, index) => (
                <div key={index} className="text-[#a9a9a9]">
                  {file.fileName}
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
              id="image"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        {/* 첨부된 이미지 미리보기 */}
        {fileInfo.length > 0 && (
          <div className="flex justify-between mb-4 h-60 overflow-hidden gap-4">
            {fileInfo.map((file, index) => (
              <img
                key={index}
                src={file.filePath}
                alt={file.fileName}
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        )}

        {/* 등록/취소 버튼 */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            onClick={handleSave}
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
        </div>
      </form>
    </div>
  );
}
export default CommunityPost;
