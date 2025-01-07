import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { BsChatHeart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import CommentList from '../../components/comment/CommentList';
import CommentInput from '../../components/comment/CommentInput';
import ConfirmModal from '../../components/modal/ConfirmModal';
import {
  fetchPostDetail,
  createComment,
  updateComment,
  deleteComment,
  toggleLikePost,
  deletePost,
} from './CommunityDetailAPI';
import useUserStore from '../../stores/userStore';
import { Comment, Post } from './CommunityDetailTypes';
// import axios from 'axios';

const CommunityDetail = () => {
  const { user } = useUserStore();
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록 상태 관리
  const [newComment, setNewComment] = useState<string>(''); // 새 댓글 내용 상태 관리
  const [likes, setLikes] = useState<number>(0); // 좋아요 수 상태 관리
  const [liked, setLiked] = useState<boolean>(false); // 좋아요 여부 상태 관리
  // const [currentUser ] = useState<Author | null>(null); // 현재 사용자 상태 관리
  const [post, setPost] = useState<Post | null>(null); // 게시글 상태 관리
  const [showModal, setShowModal] = useState<boolean>(false); // 모달 표시 상태 관리
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정할 댓글 ID 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 세부 정보 가져오고 상태 저장 로직
    const loadPostDetails = async () => {
      if (id) {
        const postDetail = await fetchPostDetail(id);
        setPost(postDetail);
        setComments(postDetail.comments);
        setLiked(postDetail.is_liked);
      }
    };
    loadPostDetails();
  }, [id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value); // 댓글 내용 업데이트
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim().length > 0 && user && post) {
      // 댓글 내용이 비어있지 않은지 확인
      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}. ${currentDate.getDate()}. ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const newCommentEntry: Comment = {
        // 나중에 수정
        id: editingCommentId ? editingCommentId : comments.length + 1,
        content: newComment,
        status: 'ACTIVE',
        created_at: formattedDate,
        is_deleted: false,
        post: post.id,
        user: user.id,
        author: {
          id: user.id,
          nickname: user.nickname,
          role: user.role,
          companyName: user.company_name,
        },
      };
      try {
        if (editingCommentId) {
          await updateComment(editingCommentId, newComment);
          // 댓글 수정 로직
          setComments(
            comments.map((comment) =>
              comment.id === editingCommentId
                ? { ...comment, content: newComment }
                : comment
            )
          );
          setEditingCommentId(null); // 수정 모드 종료
        } else {
          await createComment(post.id, newCommentEntry.content);
          const updatedComments = await fetchPostDetail(id);
          setComments(updatedComments.comments);

          // 새댓글 추가하고 생선된 댓글 추가 로직
        }

        setNewComment('');
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000); // 모달창 2초 뒤 사라짐
      } catch (error) {
        console.error('댓글 등록 에러 발생', error);
      }
    }
  };

  const handleCommentDelete = async (id: number) => {
    await deleteComment(id);
    setComments(comments.filter((comment) => comment.id !== id)); // 댓글 삭제 처리
  };
  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setNewComment(commentToEdit.content);
      setEditingCommentId(id); // 편집할 댓글 ID 설정
    }
  };

  const handleLike = async () => {
    const newLikedStatus = !liked;
    await toggleLikePost(newLikedStatus, post?.id || 0);
    setLikes(likes + (newLikedStatus ? 1 : -1));
    setLiked(newLikedStatus);
  };

  // 수정 버튼 클릭시 수정 페이지 이동
  const handleEditButtonClick = () => {
    if (id) {
      navigate(`/communitypost/${id}`);
    }
  };

  // 취소 버튼 클릭시 모달 닫기
  const closeDeleteModal = () => {
    setShowConfirmModal(false);
  };

  // 삭제 버튼 클릭시 모달열기
  const handleDeletePost = () => {
    setShowConfirmModal(true);
  };

  // 게시글 삭제 확인
  const confirmDeletePost = async () => {
    if (post) {
      await deletePost(post.id); // 수정 Post
      navigate(`/community`);
    }
    setShowConfirmModal(false);
  };

  const handleBackButtonClick = () => {
    navigate('/community');
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-[81.25rem] h-[93.0625rem] bg-white p-6 shadow-lg rounded-lg mt-[6.25rem] mb-[6.25rem]">
        <button onClick={handleBackButtonClick} className="mb-4 text-gray-400">
          뒤로가기
        </button>
        {post && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-black text-2xl font-medium">
                  [{post.category}]
                </h1>
                <h1 className="text-xl font-bold ml-2">{post.title}</h1>
                <span className="text-gray-500 text-lg ml-2 flex items-center">
                  <FaCommentDots className="mr-1" />({comments.length})
                </span>
              </div>
              {user &&
                post.author.id === user.id && ( // user.id  나중에 수정 / 1
                  <div className="flex space-x-4">
                    <button
                      onClick={handleEditButtonClick}
                      className="text-gray-400 text-base hover:text-blue-600 transition duration-300 text-sm"
                    >
                      수정
                    </button>
                    <button
                      onClick={handleDeletePost}
                      className="text-gray-400 text-base hover:text-red-600 transition duration-300 text-sm"
                    >
                      삭제
                    </button>
                  </div>
                )}
            </div>
            <div className="text-gray-400 mb-10">
              <span className="font-bold mr-2">{post.author.nickname} </span>
              <span className="text-[#F26749] mr-2">
                {post.author.companyName || post.author.role}
              </span>

              <span className="text-sm">
                {new Date(post.created_at).toLocaleString()}
              </span>
            </div>
            {post.images &&
              post.images.length > 0 && ( // 이미지 첨부해서 상세 게시글페이지 띄우기
                <div className="mb-6">
                  {post.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.image_url}
                      alt={`게시글 이미지 ${image.id}`}
                      className="w-full h-auto mb-4"
                    />
                  ))}
                </div>
              )}
            <div className="mb-6 w-full">
              <p className="mt-2 text-base leading-relaxed text-gray-700 break-words">
                {post.content}
              </p>
            </div>
            <div className="flex justify-center mt-10 mb-10">
              <button
                onClick={handleLike}
                className={`border rounded-lg px-4 py-1 flex items-center transition duration-300 ${liked ? 'bg-[#F26749] text-white border-[#F26749] font-bold' : 'border-[#F26749] text-[#F26749] font-bold'}`}
              >
                <BsChatHeart className="mr-1 h-5 w-5" />
                좋아요 ! {likes}
              </button>
            </div>
            <CommentInput
              newComment={newComment}
              onCommentChange={handleCommentChange}
              onCommentSubmit={handleCommentSubmit}
            />
            <CommentList
              comments={comments}
              currentUser={user ? user.nickname : ''}
              onDelete={handleCommentDelete}
              onEdit={handleEditComment}
            />
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold text-center">
                    댓글이 등록되었습니다 !
                  </h2>
                </div>
              </div>
            )}
            {showConfirmModal && (
              <ConfirmModal
                handleDelete={confirmDeletePost} // 삭제 버튼 클릭 시 게시글 삭제
                closeDeleteModal={closeDeleteModal} // 취소 버튼 클릭 시 모달 닫기
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;

// 이미지 가져와서 렌더링을 사용자 게시글 내용에 위치 -> 완료o
// 게시글 삭제에 댓글 삭제로 잘못 설정되어있는거 수정하기 -> 완료o
// 인터페이스 타입 관련 파일 따로 하나 만들어서 관리하기 -> 완료 o
// 페이지가 없을때 없다는 것을 알리는 404 페이지 하나 추가 -> 완료o 나중에 App.tsx 파일수정
// 댓글 등록후 새로고침하면 댓글이 사라지는 오류 에러 해결하기
// 삭제된 댓글은 렌더링 안되게끔 바꾸기 댓글 수정
// 댓글 수정시 입력폼에는 올라오지만 수정후 등록버튼 누르면 안바뀌는 에러 해결하기

// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { FaCommentDots } from 'react-icons/fa';
// import { BsChatHeart } from 'react-icons/bs';
// import { useNavigate } from 'react-router-dom';
// import CommentList from '../../components/comment/CommentList';
// import CommentInput from '../../components/comment/CommentInput';
// import ConfirmModal from '../../components/modal/ConfirmModal';
// import {
//   fetchPostDetail,
//   createComment,
//   updateComment,
//   deleteComment,
//   toggleLikePost,
//   deletePost,
// } from './CommunityDetailAPI';
// import useUserStore from '../../stores/userStore';
// // import axios from 'axios';

// interface Author {
//   id: number;
//   nickname: string;
//   role: string;
//   companyName?: string;
// }

// interface Comment {
//   id: number;
//   content: string;
//   status: string;
//   created_at: string;
//   is_deleted: boolean;
//   author: Author;
//   post: number;
//   user: number;
// }

// interface Image {
//   id: number;
//   image_url: string;
//   created_at: string;
// }

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   category: string;
//   view_count: number;
//   like_count: number;
//   comment_count: number;
//   author: Author;
//   comments: Comment[];
//   created_at: string;
//   is_liked: boolean;
//   images: Image[];
// }

// const CommunityDetail = () => {
//   const { user } = useUserStore();
//   const { id } = useParams<{ id: string }>();
//   const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록 상태 관리
//   const [newComment, setNewComment] = useState<string>(''); // 새 댓글 내용 상태 관리
//   const [likes, setLikes] = useState<number>(0); // 좋아요 수 상태 관리
//   const [liked, setLiked] = useState<boolean>(false); // 좋아요 여부 상태 관리
//   // const [currentUser ] = useState<Author | null>(null); // 현재 사용자 상태 관리
//   const [post, setPost] = useState<Post | null>(null); // 게시글 상태 관리
//   const [showModal, setShowModal] = useState<boolean>(false); // 모달 표시 상태 관리
//   const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
//   const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정할 댓글 ID 상태 관리
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 게시글 세부 정보 가져오고 상태 저장 로직
//     const loadPostDetails = async () => {
//       if (id) {
//         const postDetail = await fetchPostDetail(id);
//         setPost(postDetail);
//         setComments(postDetail.comments);
//         setLiked(postDetail.is_liked);
//       }
//     };
//     loadPostDetails();
//   }, [id]);

//   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNewComment(e.target.value); // 댓글 내용 업데이트
//   };

//   const handleCommentSubmit = async () => {
//     if (newComment.trim().length > 0 && user && post) {
//       // 댓글 내용이 비어있지 않은지 확인
//       const currentDate = new Date();
//       const formattedDate = `${currentDate.getMonth() + 1}. ${currentDate.getDate()}. ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

//       const newCommentEntry: Comment = {
//         // 나중에 수정
//         id: editingCommentId ? editingCommentId : comments.length + 1,
//         content: newComment,
//         status: 'ACTIVE',
//         created_at: formattedDate,
//         is_deleted: false,
//         post: post.id,
//         user: user.id,
//         author: {
//           id: user.id,
//           nickname: user.nickname,
//           role: user.role,
//           companyName: user.company_name,
//         },
//       };

//       if (editingCommentId) {
//         await updateComment(editingCommentId, newComment);
//         // 댓글 수정 로직
//         setComments(
//           comments.map((comment) =>
//             comment.id === editingCommentId
//               ? { ...comment, content: newComment }
//               : comment
//           )
//         );
//         setEditingCommentId(null); // 수정 모드 종료
//       } else {
//         // 새댓글 추가하고 생선된 댓글 추가 로직
//         const createdComment = await createComment(
//           post.id,
//           newCommentEntry.content
//         );
//         setComments([...comments, createdComment]);
//       }

//       setNewComment('');
//       setShowModal(true);
//       setTimeout(() => setShowModal(false), 2000); // 모달창 2초 뒤 사라짐
//     }
//   };

//   const handleCommentDelete = async (id: number) => {
//     await deleteComment(id);
//     setComments(comments.filter((comment) => comment.id !== id)); // 댓글 삭제 처리
//   };
//   const handleEditComment = (id: number) => {
//     const commentToEdit = comments.find((comment) => comment.id === id);
//     if (commentToEdit) {
//       setNewComment(commentToEdit.content);
//       setEditingCommentId(id); // 편집할 댓글 ID 설정
//     }
//   };

//   const handleLike = async () => {
//     const newLikedStatus = !liked;
//     await toggleLikePost(newLikedStatus, post?.id || 0);
//     setLikes(likes + (newLikedStatus ? 1 : -1));
//     setLiked(newLikedStatus);
//   };

//   // 수정 버튼 클릭시 수정 페이지 이동
//   const handleEditButtonClick = () => {
//     if (id) {
//       navigate(`/communitypost/${id}`);
//     }
//   };

//   // 취소 버튼 클릭시 모달 닫기
//   const closeDeleteModal = () => {
//     setShowConfirmModal(false);
//   };

//   // 삭제 버튼 클릭시 모달열기
//   const handleDeletePost = () => {
//     setShowConfirmModal(true);
//   };

//   // 게시글 삭제 확인
//   const confirmDeletePost = async () => {
//     if (post) {
//       await deletePost(post.id); // 수정 Post
//       navigate(`/community`);
//     }
//     setShowConfirmModal(false);
//   };

//   const handleBackButtonClick = () => {
//     navigate('/community');
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen px-4">
//       <div className="w-full max-w-[81.25rem] h-[93.0625rem] bg-white p-6 shadow-lg rounded-lg mt-[6.25rem] mb-[6.25rem]">
//         <button onClick={handleBackButtonClick} className="mb-4 text-gray-400">
//           뒤로가기
//         </button>
//         {post && (
//           <>
//             {post.images && post.images.length > 0 && (
//               <div className="mb-6">
//                 {post.images.map((image) => (
//                   <img
//                     key={image.id}
//                     src={image.image_url}
//                     alt={`게시글 이미지 ${image.id}`}
//                     className="w-full h-auto mb-4"
//                   />
//                 ))}
//               </div>
//             )}
//             <div className="mb-4 flex items-center justify-between">
//               <div className="flex items-center">
//                 <h1 className="text-black text-2xl font-medium">
//                   [{post.category}]
//                 </h1>
//                 <h1 className="text-xl font-bold ml-2">{post.title}</h1>
//                 <span className="text-gray-500 text-lg ml-2 flex items-center">
//                   <FaCommentDots className="mr-1" />({comments.length})
//                 </span>
//               </div>
//               {user &&
//                 post.author.id === user.id && ( // user.id  나중에 수정 / 1
//                   <div className="flex space-x-4">
//                     <button
//                       onClick={handleEditButtonClick}
//                       className="text-gray-400 text-base hover:text-blue-600 transition duration-300 text-sm"
//                     >
//                       수정
//                     </button>
//                     <button
//                       onClick={handleDeletePost}
//                       className="text-gray-400 text-base hover:text-red-600 transition duration-300 text-sm"
//                     >
//                       삭제
//                     </button>
//                   </div>
//                 )}
//             </div>

//             <div className="text-gray-400 mb-10">
//               <span className="font-bold mr-2">{post.author.nickname} </span>
//               <span className="text-[#F26749] mr-2">
//                 {post.author.companyName || post.author.role}
//               </span>

//               <span className="text-sm">
//                 {new Date(post.created_at).toLocaleString()}
//               </span>
//             </div>

//             <div className="mb-6">
//               <p className="mt-2 text-base leading-relaxed text-gray-700">
//                 {post.content}
//               </p>
//             </div>

//             <div className="flex justify-center mt-10 mb-10">
//               <button
//                 onClick={handleLike}
//                 className={`border rounded-lg px-4 py-1 flex items-center transition duration-300 ${liked ? 'bg-[#F26749] text-white border-[#F26749] font-bold' : 'border-[#F26749] text-[#F26749] font-bold'}`}
//               >
//                 <BsChatHeart className="mr-1 h-5 w-5" />
//                 좋아요 ! {likes}
//               </button>
//             </div>

//             <CommentInput
//               newComment={newComment}
//               onCommentChange={handleCommentChange}
//               onCommentSubmit={handleCommentSubmit}
//             />

//             <CommentList
//               comments={comments}
//               currentUser={user ? user.nickname : ''}
//               onDelete={handleCommentDelete}
//               onEdit={handleEditComment}
//             />

//             {showModal && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                   <h2 className="text-lg font-semibold text-center">
//                     댓글이 등록되었습니다 !
//                   </h2>
//                 </div>
//               </div>
//             )}
//             {showConfirmModal && (
//               <ConfirmModal
//                 handleDelete={confirmDeletePost} // 삭제 버튼 클릭 시 게시글 삭제
//                 closeDeleteModal={closeDeleteModal} // 취소 버튼 클릭 시 모달 닫기
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommunityDetail;
