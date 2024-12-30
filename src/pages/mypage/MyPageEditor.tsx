import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/MyPageEditor/EditorInput';

const MyPageEditor: React.FC = () => {
  const email = 'srchoo19@gmail.com';
  const [name, setName] = useState('추서령');
  const [nickname, setNickname] = useState('Jenna');
  const [phone, setPhone] = useState('010-4910-3426');
  const [workshopName, setWorkshopName] = useState('Jenna');
  const [isChecking, setIsChecking] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    null | boolean
  >(null);

  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nickname || !phone || !workshopName) {
      alert('모든 필드를 채워주세요.');
      throw new Error('400: 잘못된 요청 (유효성 검증 실패)');
    }

    alert('수정 내용이 저장되었습니다');
    navigate('/mypage');
  };

  const handleCancel = () => {
    alert('수정이 취소되었습니다');
    navigate('/mypage');
  };

  const handleCheckNickname = () => {
    setIsChecking(true);

    const mockUseNickNames = ['User1', 'Jenna', 'Admin'];
    setTimeout(() => {
      if (!nickname) {
        setIsNicknameAvailable(null);
        setIsChecking(false);
        throw new Error('400: 잘못된 요청 (유효성 검증 실패)');
      }

      if (mockUseNickNames.includes(nickname)) {
        setIsNicknameAvailable(false);
      } else {
        setIsNicknameAvailable(true);
      }
      setIsChecking(false);
    }, 1000);
  };

  return (
    <div className="p-12 max-w-2xl mx-auto mt-12">
      <h2 className="text-center text-2xl font-bold mb-8 text-[#F28749]">
        마이페이지 수정
      </h2>
      <form className="space-y-6" onSubmit={handleSave}>
        <div>
          <h3 className="text-lg font-semibold mb-4">개인정보</h3>

          <FormInput
            label="이름"
            value={name}
            placeholder="이름을 입력하세요"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex items-center mb-4">
            <label className="w-24 text-gray-700 font-medium">닉네임</label>
            <div className="flex-1">
              <input
                type="text"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="button"
              onClick={handleCheckNickname}
              className="ml-4 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
            >
              중복확인
            </button>
          </div>
          {isChecking && (
            <p className="text-sm ml-[95px] text-gray-500">
              닉네임 중복 확인 중...
            </p>
          )}
          {isNicknameAvailable === false && (
            <p className="text-sm ml-[95px] text-red-500">
              이미 사용 중인 닉네임입니다.
            </p>
          )}
          {isNicknameAvailable === true && (
            <p className="text-sm ml-[95px] text-green-500">
              사용 가능한 닉네임입니다.
            </p>
          )}

          <FormInput
            label="이메일"
            value={email}
            placeholder="이메일을 입력하세요"
            readOnly
            type="email"
          />

          <FormInput
            label="전화번호"
            value={phone}
            placeholder="전화번호를 입력하세요"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">공방 정보</h3>
          <FormInput
            label="공방 이름"
            value={workshopName}
            placeholder="공방 이름을 입력하세요"
            onChange={(e) => setWorkshopName(e.target.value)}
          />
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            type="submit"
            onClick={handleSave}
            className="px-6 py-2 bg-orange-400 text-white font-medium rounded hover:bg-orange-600"
          >
            저장
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPageEditor;
