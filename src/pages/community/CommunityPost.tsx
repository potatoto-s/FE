import { IoChevronBackOutline } from 'react-icons/io5';
import { useState } from 'react';

function CommunityPost() {
  const [formData, setFormData] = useState({
    category: '',
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
      <div className="flex items-center">
        <IoChevronBackOutline /> 게시판
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* 카테고리 선택 */}
        <div>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            aria-label="카테고리 선택"
          >
            <option value="" disabled selected>
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
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* 내용 입력 */}
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            placeholder="내용을 입력하세요"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="flex">
          {/* 이미지 첨부 */}
          <div className="ml-4">
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
        <div>
          <button type="submit" onClick={handleSave}>
            등록
          </button>
          <button type="reset">취소</button>
        </div>
      </form>
    </div>
  );
}
export default CommunityPost;
