import { useEffect, useRef } from 'react';

interface CommentInputProps {
  newComment: string;
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // 댓글 내용이 바뀌면 불러오는 핸들러 함수
  onCommentSubmit: () => Promise<void>; // 댓글 등록 버튼 클릭시 불러오는 핸들러 함수
  editingCommentText?: string;
}

const CommentInput = ({
  newComment,
  onCommentChange,
  onCommentSubmit,
}: CommentInputProps) => {
  // textarea 요소에 대한 참조를 생성하여 DOM 조작을 가능하게 함
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // textarea 높이 자동으로 설정하는 함수
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // newComment가 변경될 때마다 adjustHeight 함수 호출
  useEffect(() => {
    adjustHeight();
  }, [newComment]);

  return (
    <div className="flex items-center mb-4 border border-gray-300 rounded-lg p-2">
      <div className="inline-flex items-center bg-[#565656] text-white px-4 py-1 rounded">
        <span className="whitespace-nowrap">댓글</span>
      </div>
      <textarea
        ref={textareaRef}
        value={newComment} // textarea값 입력한 댓글 내용 설정
        onChange={onCommentChange} // 댓글 내용 수정시 호출되는 핸들러 설정
        placeholder="댓글을 입력해요..."
        className="border-0 rounded-l-none px-4 py-1 w-full ml-2 resize-none min-h-[1.5rem] max-h-[12.5rem]"
      />
      <button
        onClick={onCommentSubmit} // 댓글 등록시 호출되는 핸들러 설정
        className="border border-[#F26749] text-[#F26749] rounded-lg px-4 py-1 ml-2 min-w-[4.25rem] h-[2.0625rem] text-base font-bold 
        hover:bg-[#F26749] hover:text-white transparent duration-300"
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;

// 입력폼 input type

// interface CommentInputProps {
//   newComment: string;
//   onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onCommentSubmit: () => void;
//   editingCommentText: string;
// }

// const CommentInput = ({
//   newComment,
//   onCommentChange,
//   onCommentSubmit,
// }: CommentInputProps) => {
//   return (
//     <div className="flex items-center mb-4 border border-gray-300 rounded-lg p-2">
//       <div className="inline-flex items-center bg-[#565656] text-white px-4 py-2 rounded">
//         <span className="whitespace-nowrap">댓글</span>
//       </div>
//       <input
//         type="text"
//         value={newComment}
//         onChange={onCommentChange}
//         placeholder="댓글을 입력해요..."
//         className="border-0 rounded-l-none px-4 py-2 w-full ml-2 ${editingCommentText ? 'opacity-50}' : 'opacity-100'"
//       />
//       <button
//         onClick={onCommentSubmit}
//         className="border border-[#F26749] text-[#F26749] rounded-lg px-4 py-1 ml-2 min-w-[4.25rem] h-[2.0625rem] text-base font-bold
//         hover:bg-[#F26749] hover:text-white transparent duration-300"
//       >
//         등록
//       </button>
//     </div>
//   );
// };

// export default CommentInput;
