import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../api/ProfileGetApi';

const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{
    name: string;
    nickname: string;
    email: string;
    phone: string;
    role: string;
    workshop_name?: string;
    company_name?: string;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfile();
        setUserInfo(data);
      } catch (err) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', err);
        setError('사용자 정보를 가져오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 text-white bg-[#F28749] rounded hover:bg-orange-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center py-10 mt-[6.25rem]">
        <div className="w-full max-w-screen-lg text-center">
          <h2 className="text-lg font-bold text-[#F28749] inline-block border-b-2 border-[#F28749] pb-3">
            마이페이지
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl mt-16 relative">
          <div className="flex-shrink-0 w-40 h-40 rounded-full overflow-hidden md:mr-8">
            <img
              src="/profileIcon.png"
              className="w-full h-full object-cover"
              alt="Profile Icon"
            />
          </div>

          <div className="flex flex-col text-center md:text-left text-gray-800">
            <h3 className="text-2xl font-bold break-words">
              {userInfo?.name}({userInfo?.nickname})님 안녕하세요!
            </h3>
            <p className="text-lg mt-4 mb-2 break-words">{userInfo?.email}</p>
            <p className="text-lg break-words">{userInfo?.phone}</p>
            <div className="mt-4">
              <span className="px-4 py-2 text-sm font-medium text-[#F28749] bg-orange-100 rounded-full border border-[#F28749]">
                {userInfo?.role === 'WORKSHOP'
                  ? `공방: ${userInfo?.workshop_name}`
                  : `기업: ${userInfo?.company_name}`}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center md:text-right w-full max-w-4xl md:pr-16">
          <button
            onClick={
              () => navigate('/MyPageEditor', { state: userInfo }) // 사용자 정보를 state로 전달
            }
            className="px-6 py-2 text-white bg-[#F28749] rounded hover:bg-[#F26749]"
          >
            프로필 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
