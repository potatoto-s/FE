import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../../components/MyPageEditor/EditorInput';
import axiosAuthInstance from '../../api/axiosAuthInstance';
import { updateUserProfile } from '../../api/ProfilePatchApi';

const MyPageEditor: React.FC = () => {
  const location = useLocation();

  const userInfo = location.state as {
    name: string;
    nickname: string;
    email: string;
    phone: string;
    role: string;
    workshop_name?: string;
    company_name?: string;
  };

  const [name, setName] = useState(userInfo.name);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [phone, setPhone] = useState(userInfo.phone);

  const [workshopName, setWorkshopName] = useState(
    userInfo.role === 'WORKSHOP' ? userInfo.workshop_name || '' : ''
  );
  const [companyName, setCompanyName] = useState(
    userInfo.role === 'COMPANY' ? userInfo.company_name || '' : ''
  );

  const [isChecking, setIsChecking] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    null | boolean
  >(null);

  const navigate = useNavigate();

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    setIsChecking(true);
    try {
      const response = await axiosAuthInstance.post(
        '/api/users/check/nickname/',
        { nickname }
      );
      console.log('닉네임 중복 확인 응답:', response);

      if (response.status === 200) {
        alert('사용 가능한 닉네임입니다.');
        setIsNicknameAvailable(true);
      }
    } catch (error: any) {
      setIsNicknameAvailable(false);
      alert('닉네임 중복 확인 중 문제가 발생했습니다.');
    } finally {
      setIsChecking(false);
    }
  };

  // 사용자 정보 저장
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !nickname || !phone) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    try {
      const updatedData = {
        name,
        nickname,
        phone,
        workshop_name: userInfo.role === 'WORKSHOP' ? workshopName : '',
        company_name: userInfo.role === 'COMPANY' ? companyName : '',
      };

      const response = await updateUserProfile(updatedData);
      console.log('API 응답:', response);

      if (response.status === 200) {
        alert('수정 내용이 저장되었습니다.');

        navigate('/mypage', { state: updatedData });
      } else {
        console.error('예상치 못한 상태 코드:', response.status);
        alert('수정 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: any) {
      console.error('에러 발생:', error);

      if (error.response) {
        console.error('서버 응답 데이터:', error.response.data);
        alert(`오류: ${error.response.data.message}`);
      } else {
        alert('프로필 저장 중 문제가 발생했습니다.');
      }
    }
  };

  // 취소 버튼 클릭
  const handleCancel = () => {
    alert('수정이 취소되었습니다.');
    navigate('/mypage');
  };

  return (
    <div className="p-12 max-w-2xl mx-auto">
      <h2 className="text-center text-2xl font-bold mb-8 text-[#F28749]">
        프로필 수정
      </h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">개인정보</h3>

          <FormInput
            label="이름"
            value={name}
            placeholder="이름을 입력하세요"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex items-start mb-4">
            <label className="w-24 text-gray-700 font-medium">닉네임</label>
            <div className="flex-1">
              <input
                type="text"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="mt-1">
                {isChecking ? (
                  <p className="text-sm text-gray-500">
                    닉네임 중복 확인 중...
                  </p>
                ) : isNicknameAvailable === false ? (
                  <p className="text-sm text-red-500">
                    이미 사용 중인 닉네임입니다.
                  </p>
                ) : isNicknameAvailable === true ? (
                  <p className="text-sm text-green-500">
                    사용 가능한 닉네임입니다.
                  </p>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckNickname}
              className="ml-4 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
            >
              중복확인
            </button>
          </div>

          <FormInput
            label="이메일"
            value={userInfo.email}
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

        {userInfo.role === 'WORKSHOP' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-12">공방 정보</h3>
            <FormInput
              label="공방 이름"
              value={workshopName}
              placeholder="공방 이름을 입력하세요"
              onChange={(e) => setWorkshopName(e.target.value)}
            />
          </div>
        )}

        {userInfo.role === 'COMPANY' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-12">기업 정보</h3>
            <FormInput
              label="기업 이름"
              value={companyName}
              placeholder="기업 이름을 입력하세요"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        )}

        <div className="flex justify-center space-x-4 mt-8">
          <button
            type="submit"
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
