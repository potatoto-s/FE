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
} from './CommunityDetailAPI';
import useUserStore from '../../stores/userStore';
// import axios from 'axios';

interface Author {
  id: number;
  nickname: string;
  role: string;
  companyName?: string;
}

interface Comment {
  id: number;
  content: string;
  status: string;
  created_at: string;
  is_deleted: boolean;
  author: Author;
  post: number;
  user: number;
}

interface Image {
  id: number;
  image_url: string;
  created_at: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  author: Author;
  comments: Comment[];
  created_at: string;
  is_liked: boolean;
  images: Image[];
}

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
        user: 1, // 나중에 user.id 이렇게 다시 수정
        author: {
          id: 1, // author: id 수정
          nickname: user.nickname,
          role: user.role,
          companyName: user.company_name,
        },
      };

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
        // 새댓글 추가하고 생선된 댓글 추가 로직
        const createdComment = await createComment(
          post.id,
          newCommentEntry.content
        );
        setComments([...comments, createdComment]);
      }

      setNewComment('');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000); // 모달창 2초 뒤 사라짐
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
      await deleteComment(post.id);
      navigate(`/community`);
    }
    setShowConfirmModal(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-[81.25rem] h-[93.0625rem] bg-white p-6 shadow-lg rounded-lg mt-[6.25rem] mb-[6.25rem]">
        {post && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="mb-4 flex items-center">
                <h1 className="text-black text-2xl font-medium">
                  [ 레진/비즈공예 ]
                </h1>
                <h1 className="text-xl font-bold ml-2">{post.title}</h1>
                <span className="text-gray-500 text-lg ml-2 flex items-center">
                  <FaCommentDots className="mr-1" />({comments.length})
                </span>
              </div>
              {user &&
                post.author.id === 1 && ( // user.id  나중에 수정
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

            <div className="mb-6">
              <p className="mt-2 text-base leading-relaxed text-gray-700">
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

// 수정 버튼 클릭스 post 페이지 이동 o
// 삭제 버튼 클릭시 '게시글을 삭제 하시겠습니까?'  경고창 띄우고
// 돌아가기 , 삭제하기 버튼 2개 돌아가기 버튼 클릭수 취소 , 삭제하기 클릭시
// 게시글 삭제후 커뮤니티 페이지로 이동 o

// 목업 데이터 컴포넌트 렌더링 시 실행되는 훅
// useEffect(() => {
//   // 목업 데이터 설정
//   const mockUser: Author = {
//     id: 1,
//     nickname: '정찬희',
//     role: '공방 | 기업',
//   };

//   const mockPost: Post = {
//     id: 1,
//     title: '목업 게시글 제목',
//     content: '이것은 목업 게시글 내용입니다.',
//     category: '일반',
//     viewCount: 0,
//     imageUrls: ['https://via.placeholder.com/150'], // 목업 이미지 URL
//     createdAt: new Date().toISOString(),
//     author: mockUser,
//     comments: [
//       {
//         id: 1,
//         content: '첫 번째 댓글입니다!',
//         createdAt: new Date().toISOString(),
//         author: mockUser,
//       },
//       {
//         id: 2,
//         content: '두 번째 댓글입니다!',
//         createdAt: new Date().toISOString(),
//         author: mockUser,
//       },
//     ],
//   };

//   // 상태 업데이트
//   setPost(mockPost); // 목업 게시글 설정
//   setComments(mockPost.comments); // 목업 댓글 설정
//   setCurrentUser(mockUser); // 현재 사용자 설정
//   setLikes(mockPost.viewCount);
// }, []);
