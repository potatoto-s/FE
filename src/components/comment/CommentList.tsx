import { IoCloseOutline } from 'react-icons/io5';
import { BiEditAlt } from 'react-icons/bi';
import { CommentListProps } from '../../pages/community/CommunityDetailTypes';

const CommentList = ({
  comments,
  currentUser,
  onDelete,
  onEdit,
}: CommentListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800">댓글</h2>
      {comments.length === 0 ? (
        <p className="text-gray-400 text-sm text-center mt-10">
          등록된 댓글이 없습니다.
        </p>
      ) : (
        <ul className="list-none pl-0 mt-2">
          {comments
            .filter((comment) => !comment.is_deleted)
            .map((comment, index) => (
              <li
                key={comment.id}
                className={`flex justify-between items-start border-b py-3 ${index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-white'}`}
              >
                <div className="flex-1 px-2">
                  <div className="flex items-center mb-1">
                    <span className="text-gary-500 text-sm mr-2">
                      {comment.author.role}
                    </span>
                    <span className="text-[#F26749] text-sm mr-2">
                      {comment.author?.workshopName ||
                        comment.author?.companyName}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-800 text-base pl-1">
                    {comment.content}
                  </p>
                </div>
                {comment.author?.nickname === currentUser && ( // 댓글 작성자와 일치할시 수정 및 삭제 버튼 표시
                  <div className="flex items-center mb-2">
                    <button
                      className="text-gray-600 hover:text-blue-600 mr-1"
                      onClick={() => onEdit(comment.id)}
                    >
                      <BiEditAlt className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-600 hover:text-red-600 mr-1"
                      onClick={() => onDelete(comment.id)}
                    >
                      <IoCloseOutline className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
