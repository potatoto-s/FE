interface ModalProps {
  title: string;
  content: string;
  imageSrc?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, content, imageSrc, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
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
        {imageSrc && (
          <div className="flex justify-center mb-6">
            <img
              src={imageSrc}
              alt={title}
              className="w-auto max-h-[300px] object-contain rounded-lg shadow-md"
            />
          </div>
        )}
        <div className="text-base leading-relaxed space-y-4 text-gray-700">
          {content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            className="px-6 py-3 bg-[#F28749] text-white font-semibold rounded hover:bg-[#e07640] transition-all duration-200"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
