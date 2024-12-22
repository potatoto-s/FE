interface CommentInputProps {
  newComment: string;
  onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentSubmit: () => void;
}

const CommentInput = ({
  newComment,
  onCommentChange,
  onCommentSubmit,
}: CommentInputProps) => {
  return (
    <div className="flex items-center mb-4 border border-gray-300 rounded-lg p-2">
      <div className="inline-flex items-center bg-[#565656] text-white px-4 py-2 rounded">
        <span className="whitespace-nowrap">댓글</span>
      </div>
      <input
        type="text"
        value={newComment}
        onChange={onCommentChange}
        placeholder="댓글을 입력해요..."
        className="border-0 rounded-l-none px-4 py-2 w-full ml-2"
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
