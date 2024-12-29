import { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { BsChatHeart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import CommentList from '../../components/comment/CommentList';
import CommentInput from '../../components/comment/CommentInput';

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

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  viewCount: number;
  imageUrls: string[];
  createdAt: string;
  author: Author;
  comments: Comment[];
}

const CommunityDetail = () => {
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록 상태 관리
  const [newComment, setNewComment] = useState<string>(''); // 새댓글 내용 상태 관리
  const [likes, setLikes] = useState<number>(0); // 좋아요 수 증가 감소 상태 관리
  const [liked, setLiked] = useState<boolean>(false); // 좋아요 여부 상태 관리
  const [currentUser, setCurrentUser] = useState<Author | null>(null); // 현재 사용자 상태 관리
  const [post, setPost] = useState<Post | null>(null); // 게시글 상태 관리
  const [showModal, setShowModal] = useState<boolean>(false); // 모달 표시 상태 관리
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정할 댓글ID 상태 관리
  const navigate = useNavigate();

  // 컴포넌트 렌더링 될 시 실행되는 훅
  useEffect(() => {
    // 목업 데이터 설정
    const mockUser: Author = {
      id: 1,
      nickname: '정찬희',
      role: 'user',
      companyName: '회사명',
    };

    const mockPost: Post = {
      id: 1,
      title: '목업 게시글 제목',
      content: '이것은 목업 게시글 내용입니다.',
      category: '일반',
      viewCount: 123,
      imageUrls: ['https://via.placeholder.com/150'], // 목업 게시글 이미지 URL
      createdAt: new Date().toISOString(),
      author: mockUser,
      comments: [
        {
          id: 1,
          content: '첫 번째 댓글입니다!',
          createdAt: new Date().toISOString(),
          author: mockUser,
        },
        {
          id: 2,
          content: '두 번째 댓글입니다!',
          createdAt: new Date().toISOString(),
          author: mockUser,
        },
      ],
    };

    // 상태 업데이트
    setCurrentUser(mockUser); // 사용자 상태
    setPost(mockPost); // 게시글 상태
    setComments(mockPost.comments); // 댓글 목록 상태
  }, []); // 빈 배열 의존성으로 줘서 컴포넌트 렌더링 될때만 실행

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 댓글 내용 변경 핸들러
    setNewComment(e.target.value); // textarea의 값으로 새 댓글 내용 업데이트
  };

  const handleCommentSubmit = async () => {
    // 댓글 제출 처리
    if (newComment.trim().length > 0 && currentUser && post) {
      // 댓글 내용이 비어있는지 확인
      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}. ${currentDate.getDate()}. ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const newCommentEntry: Comment = {
        // 새로운 댓글 객체 생성
        id: editingCommentId ? editingCommentId : comments.length + 1, // 수정할 댓글 ID 있다면 사용, 아니면 새 댓글 ID
        content: newComment,
        createdAt: formattedDate,
        author: currentUser,
      };

      if (editingCommentId) {
        // 댓글 수정 로직
        setComments(
          comments.map((comment) =>
            comment.id === editingCommentId
              ? { ...comment, content: newComment } // 수정된 내용으로 업데이트
              : comment
          )
        );
        setEditingCommentId(null); // 수정 모드 종료
      } else {
        // 댓글 추가 로직
        setComments([...comments, newCommentEntry]);
      }

      setNewComment('');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000); // 모달창 2초 뒤 사라짐
    }
  };

  const handleCommentDelete = (id: number) => {
    // 댓글 삭제 처리 함수
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setNewComment(commentToEdit.content);
      setEditingCommentId(id); // 편집할 댓글 ID 설정
    }
  };

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1));
    setLiked(!liked);
  };

  const handleEditButtonClick = () => {
    // 수정 버튼 클릭시 CommunityPost 페이지 이동
    if (post) {
      navigate(`/CommunityPost`);
    }
  };

  const handleDeletePost = () => {
    console.log('게시글이 삭제되었습니다.');
    navigate(`/Community`);
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
              <div className="flex space-x-4">
                <button
                  onClick={handleEditButtonClick} // 수정 버튼 클릭 시 핸들러 호출
                  className="text-gray-400 text-base hover:text-blue-600 transition duration-300 text-sm"
                >
                  수정
                </button>
                <button
                  onClick={handleDeletePost} // 삭제 버튼 클릭 시 핸들러 호출
                  className="text-gray-400 text-base hover:text-red-600 transition duration-300 text-sm"
                >
                  삭제
                </button>
              </div>
            </div>

            <div className="mb-6">
              <p className="mt-2 text-base leading-relaxed text-gray-700">
                {post.content}
              </p>
            </div>

            <div className="flex justify-center mt-10 mb-10">
              <button
                onClick={handleLike}
                className={`border rounded-lg px-4 py-1 flex items-center transition duration-300 ${
                  liked
                    ? 'bg-[#F26749] text-white border-[#F26749] font-bold'
                    : 'border-[#F26749] text-[#F26749] font-bold'
                }`}
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
              currentUser={currentUser ? currentUser.nickname : ''}
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
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;

// 수정 버튼 클릭스 post 페이지 이동
// 삭제 버튼 클릭시 '게시글을 삭제 하시겠습니까?' 모달같은 경고문 띄우고
// 돌아가기 , 삭제하기 버튼 2개 돌아가기 버튼 클릭수 취소 , 삭제하기 클릭시
// 게시글 삭제후 커뮤니티 페이지로 이동
