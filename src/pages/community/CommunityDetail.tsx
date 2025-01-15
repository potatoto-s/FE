import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { BsChatHeart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import CommentList from '@components/comment/CommentList';
import CommentInput from '@components/comment/CommentInput';
import ConfirmModal from '@components/modal/ConfirmModal';
import {
  fetchPostDetail,
  createComment,
  updateComment,
  deleteComment,
  toggleLikePost,
  deletePost,
  fetchLikeStatus,
  // fetchComments,
} from '@pages/community/CommunityDetailAPI';
import useUserStore from '@stores/userStore';
import { Post, Comment } from '@pages/community/CommunityDetailTypes';

const CommunityDetail = () => {
  const { user } = useUserStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setcommentCount] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showLikeLoginModal, setshowLikeLoginModal] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  //게시글 세부 정보 로드
  useEffect(() => {
    const loadPostDetails = async () => {
      if (id) {
        try {
          const postDetail = await fetchPostDetail(id);
          setPost(postDetail);
          setComments(postDetail.comments);
          setLikes(postDetail.like_count);
          setIsLiked(postDetail.is_liked);
          setcommentCount(postDetail.comment_count);
          const likeStatus = await fetchLikeStatus(id);
          setIsLiked(likeStatus.is_liked);
        } catch (error) {
          console.error('게시글 로드 오류 발생', error);
        }
      }
    };
    loadPostDetails();
  }, [id]); // 빈 배열로 설정

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  // 댓글 처리 로직
  const handleCommentSubmit = async () => {
    if (!user) {
      // 비로그인 일시 등록 버튼 클릭시 로그인페이지 이동
      setShowLoginModal(true);
      setTimeout(() => {
        setShowLoginModal(false);
        navigate('/login');
      }, 2000);
      return;
    }
    if (!(user && post && newComment.trim().length > 0)) {
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 2000);
      return;
    } else {
      setShowErrorModal(false);
    }

    // 댓글 수정 처리
    const handleCommentEdit = async () => {
      if (!editingCommentId) throw new Error('Invalid editingCommentId');

      const updatedComment = `${newComment} (수정됨)`;

      try {
        await updateComment(editingCommentId, updatedComment);

        setComments(
          comments.map((comment) =>
            comment.id === editingCommentId
              ? { ...comment, content: updatedComment }
              : comment
          )
        );
        setEditingCommentId(null);
        setShowEditModal(true);
        setTimeout(() => setShowEditModal(false), 2000);
      } catch (error) {
        console.error('댓글 수정 에러 발생', error);
      }
    };

    // 댓글 생성 처리
    const handleCommentCreate = async () => {
      const res = await createComment(post.id, newComment);
      console.log(res);
      const newCommentEntry: Comment = {
        id: res.id,
        content: res.content,
        created_at: res.created_at,
        updated_at: res.updated_at,
        is_deleted: res.deleted,
        author: {
          id: user.id,
          role: user.role,
          nickname: user.nickname,
          workshop_name: user.workshop_name,
        },
      };
      setComments([newCommentEntry, ...comments]);
      setcommentCount((prevCount) => prevCount + 1);
      setNewComment('');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    };

    try {
      if (editingCommentId) {
        await handleCommentEdit();
      } else {
        await handleCommentCreate();
      }
      setNewComment('');
    } catch (error) {
      console.error('댓글 등록 에러 발생', error); // 체크용
    }
  };

  // 댓글 삭제 처리
  const handleCommentDelete = async (id: number) => {
    await deleteComment(id);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
    setcommentCount((prevCount) => prevCount - 1);
    setShowDeleteModal(true);
    setTimeout(() => setShowDeleteModal(false), 2000);
  };

  // 댓글 수정 모드 활성화
  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setNewComment(commentToEdit.content.replace(' (수정됨)', ''));
      setEditingCommentId(id);
    }
  };

  // 좋아요 토글 처리
  const handleLike = async () => {
    if (!user) {
      setshowLikeLoginModal(true);
      setTimeout(() => {
        setshowLikeLoginModal(false);
        navigate('/login');
      }, 2000);
      return;
    }

    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    setLikes((prevLikes) => prevLikes + (newLikedStatus ? 1 : -1));

    try {
      await toggleLikePost(newLikedStatus, post!.id);
    } catch (error) {
      console.error('좋아요 상태 업데이트 오류 발생', error);
      setIsLiked(!newLikedStatus); // 오류시 되돌리기
      setLikes((prevLikes) => prevLikes - (newLikedStatus ? 1 : -1));
    }
  };

  const handleEditButtonClick = () => {
    if (id) {
      navigate(`/communitypost/${id}`);
    }
  };

  const closeDeleteModal = () => {
    setShowConfirmModal(false);
  };

  const handleDeletePost = () => {
    setShowConfirmModal(true);
  };

  const confirmDeletePost = async () => {
    if (post) {
      await deletePost(post.id);
      navigate(`/community`);
    }
    setShowConfirmModal(false);
  };

  const handleBackButtonClick = () => {
    navigate('/community');
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-[81.25rem] bg-white p-6 shadow-lg rounded-lg mt-[6.25rem] mb-[6.25rem]">
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
                  <FaCommentDots className="mr-1" />({commentCount})
                </span>
              </div>
              {user && post.author.id === user.id && (
                <div className="flex space-x-4">
                  <button
                    onClick={handleEditButtonClick}
                    className="text-gray-400 hover:text-blue-600 transition duration-300 text-sm"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="text-gray-400 hover:text-red-600 transition duration-300 text-sm"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
            <div className="text-gray-400 mb-10">
              <span className="font-bold mr-2">{post.author.nickname} </span>
              <span className="text-[#F26749] mr-2">
                {post.author.workshop_name || post.author.company_name}
              </span>
              <span className="text-sm">
                {new Date(post.created_at).toLocaleString()}
              </span>
            </div>
            {post.images && post.images.length > 0 && (
              <div className="flex flex-wrap mb-6">
                {post.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.image_url}
                    alt={`게시글 이미지 ${image.id}`}
                    className="max-w-full h-auto"
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
                className={`border rounded-lg px-4 py-1 flex items-center transition duration-300 ${isLiked ? 'bg-[#F26749] text-white border-[#F26749] font-bold' : 'border-[#F26749] text-[#F26749] font-bold'}`}
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
              currentUserId={user ? user.id : 0}
              onDelete={handleCommentDelete}
              onEdit={handleEditComment}
            />

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold text-center">
                    댓글이 등록 되었습니다 !
                  </h2>
                </div>
              </div>
            )}
            {showConfirmModal && (
              <ConfirmModal
                handleDelete={confirmDeletePost}
                closeDeleteModal={closeDeleteModal}
              />
            )}
            {showDeleteModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="ext-lg font-semibold text-center">
                    댓글이 삭제 되었습니다 !
                  </h2>
                </div>
              </div>
            )}
            {showErrorModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="ext-lg font-semibold text-center">
                    최소 1글자 이상 입력하세요 !
                  </h2>
                </div>
              </div>
            )}
            {showEditModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="ext-lg font-semibold text-center">
                    댓글이 수정 되었습니다 !
                  </h2>
                </div>
              </div>
            )}
            {showLoginModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="ext-lg font-semibold text-center">
                    로그인 후 댓글을 등록 할 수 있습니다 !
                  </h2>
                </div>
              </div>
            )}
            {showLikeLoginModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="ext-lg font-semibold text-center">
                    로그인 후 좋아요를 누를 수 있습니다 !
                  </h2>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;

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
// import { Comment, Post } from './CommunityDetailTypes';

// const CommunityDetail = () => {
//   const { user } = useUserStore();
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState<string>('');
//   const [likes, setLikes] = useState<number>(0);
//   const [isLiked, setIsLiked] = useState<boolean>(false);
//   const [commentCount, setCommentCount] = useState<number>(0);
//   const [post, setPost] = useState<Post | null>(null);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
//   const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
//   const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
//   const [showEditModal, setShowEditModal] = useState<boolean>(false);
//   const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
//   const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

//   //게시글 세부 정보 로드
//   useEffect(() => {
//     const loadPostDetails = async () => {
//       if (id) {
//         try {
//           const postDetail = await fetchPostDetail(id);
//           setPost(postDetail);
//           // const comments = await fetchComments(id);
//           setComments(postDetail.comments);
//           setCommentCount(postDetail.comments.length);
//           setLikes(postDetail.likes || 0);
//           setIsLiked(postDetail.is_liked);
//         } catch (error) {
//           console.error('게시글 로드 오류 발생', error);
//         }
//       }
//     };
//     loadPostDetails();
//   }, []); // 빈 배열로 설정

//   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNewComment(e.target.value);
//   };

//   // 댓글 처리 로직
//   const handleCommentSubmit = async () => {
//     if (!user) {
//       // 비로그인 일시 등록 버튼 클릭시 로그인페이지 이동
//       setShowLoginModal(true);
//       setTimeout(() => {
//         setShowLoginModal(false);
//         navigate('/login');
//       }, 2000);
//       return;
//     }
//     if (!(user && post && newComment.trim().length > 0)) {
//       setShowErrorModal(true);
//       setTimeout(() => setShowErrorModal(false), 2000);
//       return;
//     } else {
//       setShowErrorModal(false);
//     }

//     // 댓글 수정 처리
//     const handleCommentEdit = async () => {
//       if (!editingCommentId) throw new Error('Invalid editingCommentId');

//       const updatedComment = `${newComment} (수정됨)`;

//       try {
//         await updateComment(editingCommentId, updatedComment);

//         setComments(
//           comments.map((comment) =>
//             comment.id === editingCommentId
//               ? { ...comment, content: updatedComment }
//               : comment
//           )
//         );
//         setEditingCommentId(null);
//         setShowEditModal(true);
//         setTimeout(() => setShowEditModal(false), 2000);
//       } catch (error) {
//         console.error('댓글 수정 에러 발생', error);
//       }
//     };

//     // 댓글 생성 처리
//     const handleCommentCreate = async () => {
//       const res = await createComment(post.id, newComment);
//       const newCommentEntry: Comment = {
//         id: res.id,
//         content: res.content,
//         created_at: res.created_at,
//         updated_at: res.updated_at,
//         is_deleted: res.deleted,
//         author: {
//           id: user.id,
//           role: user.role,
//           workshop_name: user.workshop_name,
//         },
//       };
//       setComments(() => [newCommentEntry, ...comments]);
//       setShowModal(true);
//       setTimeout(() => setShowModal(false), 2000);
//     };

//     try {
//       if (editingCommentId) {
//         await handleCommentEdit();
//       } else {
//         await handleCommentCreate();
//       }
//       setNewComment('');
//     } catch (error) {
//       console.error('댓글 등록 에러 발생', error); // 체크용
//     }
//   };

//   // 댓글 삭제 처리
//   const handleCommentDelete = async (id: number) => {
//     await deleteComment(id);
//     const updatedComments = comments.filter((comment) => comment.id !== id);
//     setComments(updatedComments);

//     setCommentCount(updatedComments.length);
//     setShowDeleteModal(true);
//     setTimeout(() => setShowDeleteModal(false), 2000);
//   };

//   // 댓글 수정 모드 활성화
//   const handleEditComment = (id: number) => {
//     const commentToEdit = comments.find((comment) => comment.id === id);
//     if (commentToEdit) {
//       setNewComment(commentToEdit.content.replace(' (수정됨)', ''));
//       setEditingCommentId(id);
//     }
//   };

//   // 좋아요 토글 처리
//   const handleLike = async () => {
//     if (!user || !post) return;
//     const newLikedStatus = !isLiked;
//     setIsLiked(newLikedStatus);
//     setLikes((prevLikes) => prevLikes + (newLikedStatus ? 1 : -1));

//     try {
//       await toggleLikePost(newLikedStatus, post.id);
//     } catch (error) {
//       console.error('좋아요 상태 업데이트 오류 발생', error);
//       setIsLiked(!newLikedStatus); // 오류시 되돌리기
//       setLikes((prevLikes) => prevLikes - (newLikedStatus ? 1 : -1)); // 원래 상태로 되돌리기
//     }
//   };

//   const handleEditButtonClick = () => {
//     if (id) {
//       navigate(`/communitypost/${id}`);
//     }
//   };

//   const closeDeleteModal = () => {
//     setShowConfirmModal(false);
//   };

//   const handleDeletePost = () => {
//     setShowConfirmModal(true);
//   };

//   const confirmDeletePost = async () => {
//     if (post) {
//       await deletePost(post.id);
//       navigate(`/community`);
//     }
//     setShowConfirmModal(false);
//   };

//   const handleBackButtonClick = () => {
//     navigate('/community');
//   };

//   return (
//     <div className="flex justify-center items-center px-4">
//       <div className="w-full max-w-[81.25rem] bg-white p-6 shadow-lg rounded-lg mt-[6.25rem] mb-[6.25rem]">
//         <button onClick={handleBackButtonClick} className="mb-4 text-gray-400">
//           뒤로가기
//         </button>
//         {post && (
//           <>
//             <div className="mb-4 flex items-center justify-between">
//               <div className="flex items-center">
//                 <h1 className="text-black text-2xl font-medium">
//                   [{post.category}]
//                 </h1>
//                 <h1 className="text-xl font-bold ml-2">{post.title}</h1>
//                 <span className="text-gray-500 text-lg ml-2 flex items-center">
//                   <FaCommentDots className="mr-1" />({commentCount})
//                 </span>
//               </div>
//               {user && post.author.id === user.id && (
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={handleEditButtonClick}
//                     className="text-gray-400 hover:text-blue-600 transition duration-300 text-sm"
//                   >
//                     수정
//                   </button>
//                   <button
//                     onClick={handleDeletePost}
//                     className="text-gray-400 hover:text-red-600 transition duration-300 text-sm"
//                   >
//                     삭제
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div className="text-gray-400 mb-10">
//               <span className="font-bold mr-2">{post.author.nickname} </span>
//               <span className="text-[#F26749] mr-2">
//                 {post.author.workshop_name || post.author.company_name}
//               </span>
//               <span className="text-sm">
//                 {new Date(post.created_at).toLocaleString()}
//               </span>
//             </div>
//             {post.images && post.images.length > 0 && (
//               <div className="flex flex-wrap mb-6">
//                 {post.images.map((image) => (
//                   <img
//                     key={image.id}
//                     src={image.image_url}
//                     alt={`게시글 이미지 ${image.id}`}
//                     className="w-80 h-80 mb-4"
//                   />
//                 ))}
//               </div>
//             )}
//             <div className="mb-6 w-full">
//               <p className="mt-2 text-base leading-relaxed text-gray-700 break-words">
//                 {post.content}
//               </p>
//             </div>
//             <div className="flex justify-center mt-10 mb-10">
//               <button
//                 onClick={handleLike}
//                 className={`border rounded-lg px-4 py-1 flex items-center transition duration-300 ${isLiked ? 'bg-[#F26749] text-white border-[#F26749] font-bold' : 'border-[#F26749] text-[#F26749] font-bold'}`}
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
//               currentUserId={user ? user.id : 0}
//               onDelete={handleCommentDelete}
//               onEdit={handleEditComment}
//             />

//             {showModal && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                   <h2 className="text-lg font-semibold text-center">
//                     댓글이 등록 되었습니다 !
//                   </h2>
//                 </div>
//               </div>
//             )}
//             {showConfirmModal && (
//               <ConfirmModal
//                 handleDelete={confirmDeletePost}
//                 closeDeleteModal={closeDeleteModal}
//               />
//             )}
//             {showDeleteModal && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                   <h2 className="ext-lg font-semibold text-center">
//                     댓글이 삭제 되었습니다 !
//                   </h2>
//                 </div>
//               </div>
//             )}
//             {showErrorModal && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                   <h2 className="ext-lg font-semibold text-center">
//                     최소 1글자 이상 입력하세요 !
//                   </h2>
//                 </div>
//               </div>
//             )}
//             {showEditModal && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                   <h2 className="ext-lg font-semibold text-center">
//                     댓글이 수정 되었습니다 !
//                   </h2>
//                 </div>
//               </div>
//             )}
//             {showLoginModal && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                   <h2 className="ext-lg font-semibold text-center">
//                     로그인 후 댓글을 등록 할 수 있습니다 !
//                   </h2>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommunityDetail;
