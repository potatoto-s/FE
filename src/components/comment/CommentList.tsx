import { IoCloseOutline } from 'react-icons/io5';
import { BiEditAlt } from 'react-icons/bi';
import { CommentListProps } from '@/types/CommunityDetailTypes';
import dayjs from 'dayjs';

const CommentList = ({
  comments,
  currentUserId,
  onDelete,
  onEdit,
}: CommentListProps) => {
  const isNotDeletedComments = comments.filter(
    (comment) => !comment.is_deleted
  );
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY. MM. DD. HH:mm');
  };
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800">댓글</h2>
      {isNotDeletedComments.length === 0 ? (
        <p className="text-gray-400 text-sm text-center mt-10">
          등록된 댓글이 없습니다.
        </p>
      ) : (
        <ul className="list-none pl-0 mt-2">
          {isNotDeletedComments.map(
            ({ id, author, created_at, content }, index) => {
              const authorName = author?.workshop_name || author?.company_name;
              const authorRole = author.role === 'WORKSHOP' ? '👩🏻‍🎨' : '🏢';
              const isAuthor = author.id === Number(currentUserId);
              return (
                <li
                  key={id}
                  className={`flex justify-between items-start border-b py-3 ${index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-white'}`}
                >
                  <div className="flex-1 px-2">
                    <div className="flex items-center mb-1">
                      <span className="text-[#F26749] text-xs mr-2">
                        {authorName}
                      </span>
                      <span className="text-xs mr-2">{authorRole}</span>
                      <span className="text-gray-400 text-xs">
                        {formatDate(created_at)}
                      </span>
                    </div>
                    <p className="flex items-center text-gray-800 text-base pl-1">
                      {content.replace(' (수정됨)', '')}
                      {content.includes('(수정됨)') && (
                        <span className="text-gray-400 text-xs ml-2">
                          (수정됨)
                        </span>
                      )}
                    </p>
                  </div>
                  {isAuthor && (
                    <div className="flex items-center mb-2">
                      <button
                        className="text-gray-600 hover:text-blue-600 mr-1"
                        onClick={() => onEdit(id)}
                      >
                        <BiEditAlt className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-red-600 mr-1"
                        onClick={() => onDelete(id)}
                      >
                        <IoCloseOutline className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
};

export default CommentList;

// import { IoCloseOutline } from 'react-icons/io5';
// import { BiEditAlt } from 'react-icons/bi';
// import { CommentListProps } from '@/types/CommunityDetailTypes';
// import dayjs from 'dayjs';

// const CommentList = ({
//   comments,
//   currentUserId,
//   onDelete,
//   onEdit,
// }: CommentListProps) => {
//   const isNotDeletedComments = comments.filter(
//     (comment) => !comment.is_deleted
//   );
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };
//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold text-gray-800">댓글</h2>
//       {isNotDeletedComments.length === 0 ? (
//         <p className="text-gray-400 text-sm text-center mt-10">
//           등록된 댓글이 없습니다.
//         </p>
//       ) : (
//         <ul className="list-none pl-0 mt-2">
//           {isNotDeletedComments.map(
//             ({ id, author, created_at, content }, index) => {
//               const authorName = author?.workshop_name || author?.company_name;
//               const authorRole = author.role === 'WORKSHOP' ? '👩🏻‍🎨' : '🏢';
//               const isAuthor = author.id === Number(currentUserId);
//               return (
//                 <li
//                   key={id}
//                   className={`flex justify-between items-start border-b py-3 ${index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-white'}`}
//                 >
//                   <div className="flex-1 px-2">
//                     <div className="flex items-center mb-1">
//                       <span className="text-[#F26749] text-xs mr-2">
//                         {authorName}
//                       </span>
//                       <span className="text-xs mr-2">{authorRole}</span>
//                       <span className="text-gray-400 text-xs">
//                         {formatDate(created_at)}
//                       </span>
//                     </div>
//                     <p className="flex items-center text-gray-800 text-base pl-1">
//                       {content.replace(' (수정됨)', '')}
//                       {content.includes('(수정됨)') && (
//                         <span className="text-gray-400 text-xs ml-2">
//                           (수정됨)
//                         </span>
//                       )}
//                     </p>
//                   </div>
//                   {isAuthor && (
//                     <div className="flex items-center mb-2">
//                       <button
//                         className="text-gray-600 hover:text-blue-600 mr-1"
//                         onClick={() => onEdit(id)}
//                       >
//                         <BiEditAlt className="h-4 w-4" />
//                       </button>
//                       <button
//                         className="text-gray-600 hover:text-red-600 mr-1"
//                         onClick={() => onDelete(id)}
//                       >
//                         <IoCloseOutline className="h-5 w-5" />
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               );
//             }
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CommentList;
