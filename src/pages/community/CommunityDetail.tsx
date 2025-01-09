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

const CommunityDetail = () => {
  const { user } = useUserStore();
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPostDetails = async () => {
      if (id) {
        const postDetail = await fetchPostDetail(id);
        setPost(postDetail);
        setComments(postDetail.comments);
        setLiked(postDetail.is_liked);
      }
    };
    loadPostDetails();
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!(user && post && newComment.trim().length > 0)) return;

    const handleCommentEdit = async () => {
      if (!editingCommentId) throw new Error('Invalid editingCommentId');
      await updateComment(editingCommentId, newComment);
      setComments(
        comments.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, content: newComment }
            : comment
        )
      );
      setEditingCommentId(null);
    };

    const handleCommentCreate = async () => {
      const res = await createComment(post.id, newComment);
      const newCommentEntry: Comment = {
        id: res.id,
        content: res.content,
        created_at: res.created_at,
        updated_at: res.updated_at,
        is_deleted: res.deleted,
        author: {
          id: user.id,
          role: user.role,
          workshop_name: user.workshop_name,
        },
      };
      setComments([newCommentEntry, ...comments]);
    };

    try {
      if (editingCommentId) {
        await handleCommentEdit();
      } else {
        await handleCommentCreate();
      }
      setNewComment('');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    } catch (error) {
      console.error('댓글 등록 에러 발생', error); // 체크용
    }
  };

  const handleCommentDelete = async (id: number) => {
    await deleteComment(id);
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setNewComment(commentToEdit.content);
      setEditingCommentId(id);
    }
  };

  const handleLike = async () => {
    const newLikedStatus = !liked;
    await toggleLikePost(newLikedStatus, post?.id || 0);
    setLikes(likes + (newLikedStatus ? 1 : -1));
    setLiked(newLikedStatus);
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
                  <FaCommentDots className="mr-1" />({comments.length})
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
                    className="w-80 h-80 mb-4"
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
              currentUserId={user ? user.id : 0}
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
                handleDelete={confirmDeletePost}
                closeDeleteModal={closeDeleteModal}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;

// 댓글 로직 에러 전부 수정 및 해결

// HTTP 로그 확인해본결과 204 No Content 요청이 성공으로 처리되고
// 서버에 반환할 데이터 없음을 뜻함
// 댓글 삭제 성공적으로 백엔드에게 넘어가는거같음

// 댓글 리스트 컨테이너 UI 동적으로 처리되게끔 UI 변경
