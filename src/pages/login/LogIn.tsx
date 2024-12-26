import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosAuthInstance from '../../api/axiosAuthInstance';
import useAuthStore from '../../stores/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAccessToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axiosAuthInstance.post('/api/login/', {
        email,
        password,
      });

      const { access: accessToken, refresh: refreshToken } = response.data;

      // Access Token 저장
      setAccessToken(accessToken);

      // Refresh Token을 localStorage에 저장
      localStorage.setItem('refreshToken', refreshToken);

      // 메인 페이지로 이동
      navigate('/main');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {isLoading ? (
        // 로딩 중 UI
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-4">로딩 중...</p>
        </div>
      ) : (
        // 로그인 UI
        <div className="w-full max-w-[81.25rem] flex flex-col items-center pb-16">
          <div className="flex flex-col items-center w-full mb-12">
            <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
            <h1 className="text-2xl font-bold text-[#F28749]">로그인</h1>
            <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
          </div>

          <form
            onSubmit={handleLogin}
            className="max-w-[25rem] flex flex-col items-center"
          >
            <div className="flex items-center w-full mb-6">
              <label
                htmlFor="email"
                className="text-gray-700 text-left pr-3 w-[5rem]"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none w-[12rem]"
              />
            </div>
            <div className="flex items-center w-full mb-6">
              <label
                htmlFor="password"
                className="text-gray-700 text-left pr-3 w-[5rem]"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none w-[12rem]"
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-[10rem] bg-[#F28749] text-white py-2 rounded mt-2 mb-2 hover:bg-orange-600"
              >
                Login
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <p className="text-center text-sm text-gray-600 mt-4">
              계정이 없으신가요?{' '}
              <a href="/signup" className="text-[#F28749] hover:underline">
                회원가입
              </a>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
