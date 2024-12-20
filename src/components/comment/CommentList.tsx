import { IoCloseOutline } from 'react-icons/io5';

interface Comment {
  id: number;
  text: string;
  date: string;
  user: string;
}

interface CommentListProps {
  comments: Comment[];
  currentUser: string;
  onDelete: (id: number) => void;
}

const CommentList = ({ comments, currentUser, onDelete }: CommentListProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800">댓글</h2>
      <ul className="list-none pl-0 mt-2">
        {comments.map((comment, index) => (
          <li // 댓글 배열로 짝수 일때마다 색이 다르게 댓글 렌더링
            key={comment.id}
            className={`flex justify-between items-center border-t border-b py-2 ${index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-white'}`}
          >
            <div className="flex items-center flex-1 justify-between px-2">
              <span className="text-[#565656] text-sm">{comment.user}</span>
              <span className="text-[#565656] mx-2">|</span>
              <span className="text-[#AEAEAE] text-xs">{comment.date}</span>
              <span className="text-[#565656] mx-2">|</span>
              <span className="text-[#565656] flex-1 text-left text-sm">
                {comment.text}
              </span>
            </div>
            {comment.user === currentUser && (
              <button
                className="text-gray-600 hover:text-red-600 mx-2"
                onClick={() => onDelete(comment.id)}
              >
                <IoCloseOutline />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
