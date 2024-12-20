import { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { BsChatHeart } from 'react-icons/bs';

interface Comment {
  // 댓글 인터페이스
  id: number;
  text: string;
  date: string;
  user: string;
}

const CommunityDetail = () => {
  // 상태 정의: 댓글 목록 저장, 새댓글 저장, 좋아요 수 저장
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 댓글 입력 변경 처리 함수: 사용자가 입력한 댓글을 newComment 상태에 저장
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // 사용자가 새로운 댓글 제출할 때 실행되는 함수 (조건문)
    //  새로운 댓글을 생성하고, 기존 댓글 목록에 추가 그후 댓글 입력필드 초기화
    if (newComment.trim()) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}. ${currentDate.getDate()}. ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      const newCommentEntry: Comment = {
        id: comments.length + 1,
        text: newComment,
        date: formattedDate,
        user: 'murimum[공방]',
      };
      setComments([...comments, newCommentEntry]);
      setNewComment('');
    }
  };

  const handleCommentDelete = (id: number) => {
    // 댓글을 삭제하는 함수
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleLike = () => {
    // 좋아요 버튼 클릭시 실행되는 함수 likes 상태 1 증가
    setLikes(likes + 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
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

        <div className="mb-2">
          <p className="text-[#565656] text-base">chanhee0708 [오즈네공방]</p>
          <p className="text-[#565656] text-base mb-5">2024.12.16 01:35:21</p>
        </div>

        <div className="mb-6">
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
            className="border border-[#F26749] text-[#F26749] rounded-lg px-4 py-1 flex items-center"
          >
            <BsChatHeart className="mr-1 h-5 w-5" />
            좋아요 ! {likes}
          </button>
        </div>

        <div className="flex items-center mb-4 border border-gray-300 rounded-lg p-2">
          <div className="inline-flex items-center bg-[#565656] text-white px-4 py-2 rounded">
            <span className="whitespace-nowrap">댓글</span>
          </div>
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력해요..."
            className="border-0 rounded-l-none px-4 py-2 w-full ml-2"
          />
          <button
            onClick={handleCommentSubmit}
            className="border border-[#F26749] text-[#F26749] rounded-lg px-4 py-1 ml-2 min-w-[4.25rem] h-[2.0625rem] text-base font-bold"
          >
            등록
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">댓글</h2>
          <ul className="list-none pl-0 mt-2">
            {comments.map((comment, index) => (
              <li
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
                <button
                  className="text-gray-600 hover:text-red-600 mx-2"
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  <IoCloseOutline />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;

// const handleCommentSubmit = () => {
// 년도 포함 타이머 함수
//   if (newComment.trim()) {
//     const currentDate = new Date().toLocaleString();
//     const newCommentEntry: Comment = {
//       id: comments.length + 1,
//       text: newComment,
//       date: currentDate,
//       user: 'murimum[공방]',
//     };
//     setComments([...comments, newCommentEntry]);
//     setNewComment('');
//   }
// };
