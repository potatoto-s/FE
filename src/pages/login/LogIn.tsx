import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../stores/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, setAccessToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { accessToken, user } = response.data.data;

      setAccessToken(accessToken);
      setUser(user);
      navigate('/main');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-[81.25rem] flex flex-col items-center pt-16 pb-16">
        {/* 로그인 타이틀 */}
        <div className="flex flex-col items-center w-full mb-12">
          <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
          <h1 className="text-2xl font-bold text-[#F28749]">로그인</h1>
          <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
        </div>

        {/* 폼 */}
        <form
          onSubmit={handleLogin}
          className="max-w-[18.75rem] flex flex-col items-center"
        >
          <div className="flex items-center w-full mb-4">
            <label
              htmlFor="email"
              className="w-1/4 text-gray-700 text-left pr-2"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className="w-2/3 border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          <div className="flex items-center w-full mb-6">
            <label
              htmlFor="password"
              className="w-1/4 text-gray-700 text-left pr-2"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-2/3 border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-3/5 bg-[#F28749] text-white py-2 rounded hover:bg-orange-600 mt-2 mb-2"
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
    </div>
  );
};

export default Login;
