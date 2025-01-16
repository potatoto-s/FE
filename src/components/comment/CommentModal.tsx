import React from 'react';

interface CommentModalProps {
  type: 'success' | 'error' | 'confirm' | 'edit' | 'login' | 'likeLogin';
  message: string;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ type }) => {
  const getTitle = () => {
    switch (type) {
      case 'success':
        return '댓글이 등록 되었습니다!';
      case 'error':
        return '최소 1글자 이상 입력하세요!';
      case 'confirm':
        return '댓글이 삭제 되었습니다!';
      case 'edit':
        return '댓글이 수정 되었습니다!';
      case 'login':
        return '로그인 후 댓글을 등록 할 수 있습니다!';
      case 'likeLogin':
        return '로그인 후 좋아요를 누를 수 있습니다!';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-center">{getTitle()}</h2>
      </div>
    </div>
  );
};

export default CommentModal;
