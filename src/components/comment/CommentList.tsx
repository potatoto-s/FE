import { IoCloseOutline } from 'react-icons/io5';
import { BiEditAlt } from 'react-icons/bi';

interface Author {
  id: number;
  nickname: string;
  role: string;
  companyName?: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: Author;
}

interface CommentListProps {
  comments: Comment[];
  currentUser: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const CommentList = ({
  comments,
  currentUser,
  onDelete,
  onEdit,
}: CommentListProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800">댓글</h2>
      <ul className="list-none pl-0 mt-2">
        {comments.map((comment, index) => (
          <li
            key={comment.id}
            className={`flex justify-between items-start border-b py-3 ${index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-white'}`}
          >
            <div className="flex-1 px-2">
              <div className="flex items-center mb-1">
                <span className="text-gray-500 text-sm">
                  {/* 아이디 표시하기 */}
                  {comment.author.nickname}
                  {/* {comment.user.replace(/.(?=.{3})/g, '*')} */}
                  {/* 아이디 가리기 */}
                </span>
                <span className="text-sm text-[#d28878] mx-2">Ananti</span>
                <span className="text-gray-400 text-xs">
                  {comment.createdAt}
                </span>
              </div>
              <p className="text-gray-800 text-base pl-1">{comment.content}</p>
            </div>
            {comment.author.nickname === currentUser && ( // 댓글 작성자와 일치할시 수정 및 삭제 버튼 표시
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
    </div>
  );
};

export default CommentList;

// 1자 형식 댓글

// import { IoCloseOutline } from 'react-icons/io5';
// import { BiEditAlt } from 'react-icons/bi';

// interface Comment {
//   id: number;
//   text: string;
//   date: string;
//   user: string;
// }

// interface CommentListProps {
//   comments: Comment[];
//   currentUser: string;
//   onDelete: (id: number) => void;
//   onEdit: (id: number) => void;
// }

// const CommentList = ({
//   comments,
//   currentUser,
//   onDelete,
//   onEdit,
// }: CommentListProps) => {
//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold text-gray-800">댓글</h2>
//       <ul className="list-none pl-0 mt-2">
//         {comments.map((comment, index) => (
//           <li
//             key={comment.id}
//             className={`flex justify-between items-center border-t border-b py-2 ${index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-white'}`}
//           >
//             <div className="flex items-center flex-1 justify-between px-2">
//               <span className="text-[#565656] text-sm">{comment.user}</span>
//               <span className="text-[#565656] mx-2">|</span>
//               <span className="text-[#AEAEAE] text-xs">{comment.date}</span>
//               <span className="text-[#565656] mx-2">|</span>
//               <span className="text-[#565656] flex-1 text-left text-sm">
//                 {comment.text}
//               </span>
//             </div>
//             {comment.user === currentUser && (
//               <div className="flex items-center relative">
//                 <button
//                   className="text-gray-600 hover:text-blue-600 flex items-center relative group"
//                   onClick={() => onEdit(comment.id)}
//                 >
//                   <BiEditAlt className="h-4 w-4" />
//                 </button>
//                 <button
//                   className="text-gray-600 hover:text-red-600 mx-2 flex items-center relative group"
//                   onClick={() => onDelete(comment.id)}
//                 >
//                   <IoCloseOutline className="h-5 w-5" />
//                 </button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CommentList;
