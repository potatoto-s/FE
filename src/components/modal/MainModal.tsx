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
    setCurrentPage((prev) => Math.min(prev + 1, 2)); // 최대 페이지는 2
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // 최소 페이지는 1
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // 외부 클릭 시 onClose 실행
    >
      <div
        className="relative bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 방지
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#F28749]">
          {title}
        </h2>
        {currentPage === 1 && (
          <div>
            {imageSrc && (
              <div className="flex flex-row justify-center mb-6 p-2">
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-[300px] max-h-[300px] object-contain rounded-xl shadow-lg ml-10 mr-10"
                />
                {info && (
                  <p className="border-2 border-gray-100 ml-10 mr-10 text-lg text-gray-600 font-medium text-left p-2 shadow-md">
                    {info}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        {currentPage === 2 && (
          <div className="text-base leading-relaxed space-y-4 text-gray-700">
            {content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
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
