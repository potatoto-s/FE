import { useState, useEffect, useRef } from 'react';

interface CommentInputProps {
  newComment: string;
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCommentSubmit: () => Promise<void>;
}

const CommentInput = ({
  newComment,
  onCommentChange,
  onCommentSubmit,
}: CommentInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [placeholder, setPlaceholder] = useState(
    window.innerWidth >= 640
      ? '댓글에는 욕설이나 비속어 사용을 삼가해 주세요. 모두가 편안하게 소통할 수 있도록 협조 부탁드립니다.'
      : '댓글에는 욕설이나 비속어 사용을 삼가해 주세요'
  );

  useEffect(() => {
    const handleResize = () => {
      setPlaceholder(
        window.innerWidth >= 640
          ? '댓글에는 욕설이나 비속어 사용을 삼가해 주세요. 모두가 편안하게 소통할 수 있도록 협조 부탁드립니다.'
          : '댓글에는 욕설이나 비속어 사용을 삼가해 주세요'
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex items-center mb-4 border border-gray-300 rounded-lg p-2">
      <div className="inline-flex items-center bg-[#565656] text-white px-4 py-1 rounded">
        <span className="whitespace-nowrap">댓글</span>
      </div>

      <textarea
        ref={textareaRef}
        value={newComment}
        onChange={onCommentChange}
        placeholder={placeholder}
        className="border-0 rounded-l-none px-4 py-1 w-full ml-2 resize-none h-[4rem] text-sm"
      />
      <button
        onClick={onCommentSubmit}
        className="border border-[#F26749] text-[#F26749] rounded-lg px-4 py-1 ml-2 min-w-[4.25rem] h-[2.0625rem] text-base font-bold 
        hover:bg-[#F26749] hover:text-white transparent duration-300"
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;
