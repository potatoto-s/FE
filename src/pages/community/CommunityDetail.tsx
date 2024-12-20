import { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { BsChatHeart } from 'react-icons/bs';
import CommentList from '../../components/comment/CommentList';
import CommentInput from '../../components/comment/CommentInput';

interface Comment {
  // 댓글 인터페이스 정의
  id: number;
  text: string;
  date: string;
  user: string;
}

const CommunityDetail = () => {
  // 상태 관리
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [currentUser] = useState<string>('currentUser'); // 나중에 유저값 수정
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 댓글 등록후 등록된 댓글 텍스트로 상태 업데이트
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (typeof newComment === 'string' && newComment.trim().length > 0) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}. ${currentDate.getDate()}. ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      const newCommentEntry: Comment = {
        id: comments.length + 1,
        text: newComment,
        date: formattedDate,
        user: currentUser,
      };
      setComments([...comments, newCommentEntry]);
      setNewComment('');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000); // 모달창 2초뒤 창사라짐
    }
  };

  const handleCommentDelete = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 mt-[6.25rem]">
      <div className="w-full max-w-[81.25rem] h-[93.0625rem] bg-white p-6 shadow-lg rounded-lg">
        <div className="mb-4 flex items-center">
          <h1 className="text-black text-2xl font-medium">[ 레진/비즈공예 ]</h1>
          <h1 className="text-xl font-bold ml-2">
            비즈의 종류는 무엇이 있나요?
          </h1>
          <span className="text-gray-500 text-lg ml-2 flex items-center">
            <FaCommentDots className="mr-1" />({comments.length})
          </span>
        </div>

        <div className="mb-6">
          <div className="mb-4">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="inline-block mb-2"
            />
          </div>
          <p className="mt-2 text-base leading-relaxed text-gray-700">
            내용비즈의 종류로는 크게 진주, 펄 시드비즈, 화이어 폴리쉬, 터키석,
            캣츠아이, 론델, 주판알 크리스탈, 자개 비즈 등이 있으며 이외에도
            종류는 다양하다. 각 비즈마다 특징이 다른데 대표적으로 캣츠아이는
            고양이 눈처럼 세로줄이 비즈에 있다. 내용비즈의 종류로는 크게 진주,
            펄 시드비즈, 화이어 폴리쉬, 터키석, 캣츠아이, 론델, 주판알 크리스탈,
            자개 비즈 등이 있으며 이외에도 종류는 다양하다. 각 비즈마다 특징이
            다른데 대표적으로 캣츠아이는 고양이 눈처럼 세로줄이 비즈에 있다.
            내용비즈의 종류로는 크게 진주, 펄 시드비즈, 화이어 폴리쉬, 터키석,
            캣츠아이, 론델, 주판알 크리스탈, 자개 비즈 등이 있으며 이외에도
            종류는 다양하다. 각 비즈마다 특징이 다른데 대표적으로 캣츠아이는
            고양이 눈처럼 세로줄이 비즈에 있다. 내용비즈의 종류로는 크게 진주,
            펄 시드비즈, 화이어 폴리쉬, 터키석, 캣츠아이, 론델, 주판알 크리스탈,
            자개 비즈 등이 있으며 이외에도 종류는 다양하다. 각 비즈마다 특징이
            다른데 대표적으로 캣츠아이는 고양이 눈처럼 세로줄이 비즈에 있다.
            내용비즈의 종류로는 크게 진주, 펄 시드비즈, 화이어 폴리쉬, 터키석,
            캣츠아이, 론델, 주판알 크리스탈, 자개 비즈 등이 있으며 이외에도
            종류는 다양하다. 각 비즈마다 특징이 다른데 대표적으로 캣츠아이는
            고양이 눈처럼 세로줄이 비즈에 있다.
          </p>
        </div>

        <div className="flex justify-center mt-10 mb-10">
          <button
            onClick={handleLike}
            className={`border rounded-lg px-4 py-1 flex items-center transition duration-300 ${
              liked
                ? 'bg-[#F26749] text-white border-[#F26749]'
                : 'border-[#F26749] text-[#F26749]'
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
          currentUser={currentUser}
          onDelete={handleCommentDelete}
        />

        {showModal && ( // 댓글 입력후 등록 버튼 누를시 모달 창띄우기
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-center">
                댓글이 등록되었습니다 !
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;
