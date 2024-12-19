import { IoChevronBackOutline } from 'react-icons/io5';
import { useState } from 'react';

function CommunityPost() {
  const [formData, setFormData] = useState({
    category: '1',
    title: '',
    content: '',
    image: null,
  });

  // 입력값 변경 처리
  const handleChange = (event) => {
    const { name, value } = event.target;
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

  // 상태 설정: 파일 경로와 파일 이름을 저장할 상태
  const [fileInfo, setFileInfo] = useState({ fileName: '', filePath: '' });

  // 이미지 파일이 선택될 때 호출되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileInfo({
        fileName: file.name, // 선택된 파일 이름
        filePath: URL.createObjectURL(file), // 선택된 파일의 경로
      });
    }
  };

  return (
    <div className="h-[100vh] w-[81.25rem] pt-[6.25rem] bg-[#BBBBBB]">
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
            <option value="balloon_art">풍선/페이퍼아트</option>
            <option value="gift_wrapping">선물포장/보자기</option>
            <option value="wood_clay_leather">목공/도자기/가죽</option>
            <option value="resin_beads">레진/비즈공예</option>
            <option value="diffuser_candle">디퓨져/캔들/석고방향제</option>
            <option value="rattan_macrame">라탄/마크라메</option>
            <option value="flower">플라워</option>
            <option value="total_crafts">토탈공예</option>
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
        <div>
          <textarea
            id="content"
            name="content"
            placeholder="내용을 입력하세요"
            aria-label="내용용"
            value={formData.content}
            onChange={handleChange}
            required
            className="block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F28749] resize-none h-[500px] overflow-auto"
          ></textarea>
        </div>

        <div className="flex">
          {/* 이미지 첨부 */}
          <div className="mb-4 flex items-center">
            {fileInfo.fileName && (
              <div>
                <p>
                  {fileInfo.fileName} && {fileInfo.filePath}
                </p>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="image">이미지첨부</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        {/* 첨부된 이미지 미리보기 */}
        {/* {imagePreview && (
          <div id="image-preview" style={{ marginTop: '10px' }}>
            <img
              src={imagePreview}
              alt="이미지 미리보기"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </div>
        )} */}

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
