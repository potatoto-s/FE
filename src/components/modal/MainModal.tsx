import { useState } from 'react';

interface ModalProps {
  title: string;
  content: string;
  imageSrc?: string;
  info?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  imageSrc,
  info,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, 2));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Parse content and highlight specific sentences
  const parseContent = (content: string, boldSentences: string[]) => {
    return content.split('\n').map((paragraph, index) => {
      const isBold = boldSentences.includes(paragraph.trim());
      return (
        <p key={index} className="mb-2">
          {isBold ? <strong>{paragraph}</strong> : paragraph}
        </p>
      );
    });
  };

  const boldSentences = [
    'Q: 시작하게 된 계기는 무엇인가요?',
    'Q: 작품 제작 시 가장 중요하게 생각하는 것은 무엇인가요?',
    'Q: 매력은 무엇인가요?',
    'Q: 앞으로의 계획이 있다면 무엇인가요?',
    '클래스 목표 및 기대효과',
    '난이도 및 소요 시간',
    '수강료 할인 정보 (사전 예약 시 20% 할인)',
    '재료 키트 정보',
  ]; // 하이라이트 문장들

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-3 ml-11 text-left text-[#F28749]">
          {title}
        </h2>

        <hr className="border-t border-[#F28749] my-4 border-[1px] mx-11" />

        {currentPage === 1 && (
          <div>
            {imageSrc && (
              <div className="flex flex-row justify-center mb-6 p-2">
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-[300px] max-h-[300px] object-contain rounded-xl shadow-lg ml-10 mr-10 mt-2"
                />
                {info && (
                  <div className="ml-10 mr-10 text-lg text-gray-600 font-medium text-justify p-2 mb-10 space-y-2">
                    {info.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {currentPage === 2 && (
          <div className="text-base leading-relaxed space-y-4 text-gray-700 m-11 mt-2">
            {parseContent(content, boldSentences)}
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white rounded ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#F28749] hover:bg-[#e07640]'
            }`}
          >
            이전
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === 2}
            className={`px-4 py-2 text-white rounded ${
              currentPage === 2
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#F28749] hover:bg-[#e07640]'
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
