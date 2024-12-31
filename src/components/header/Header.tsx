import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/assets/logo.png';
import useAuthStore from '../../stores/authStore';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 햄버거 메뉴 상태
  const { accessToken, logout } = useAuthStore(); // 로그인 상태와 로그아웃 함수

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center h-[6.25rem] px-4 sm:px-8 max-w-[81.25rem] mx-auto">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="로고" className="h-[2rem] sm:h-[2.5rem]" />
        </Link>

        {/* 햄버거 버튼 */}
        <button
          className="sm:hidden text-[#F28749]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <nav
            className="absolute top-[6.25rem] right-4 bg-white shadow-lg rounded-lg w-[12.5rem] text-center border border-gray-200 z-20"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link
              to="/community"
              className="block py-2 px-4 text-black hover:text-gray-800 border-b border-gray-200"
            >
              Community
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 text-black hover:text-gray-800 border-b border-gray-200"
            >
              Contact Us
            </Link>
            {accessToken ? (
              <>
                <Link
                  to="/mypage"
                  className="block py-2 px-4 text-black hover:text-gray-800 border-b border-gray-200"
                >
                  마이페이지
                </Link>
                <div
                  onClick={handleLogout}
                  className="block py-2 px-4 text-black hover:text-gray-800 cursor-pointer"
                >
                  로그아웃
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 px-4 text-[#F28749] font-bold hover:text-[#c36d3b]"
              >
                Login
              </Link>
            )}
          </nav>
        )}

        {/* 데스크톱 메뉴 */}
        <nav className="hidden sm:flex sm:gap-12 items-center">
          <Link to="/community" className="text-[#0F0F0F] hover:underline ">
            Community
          </Link>
          <Link to="/contact" className="text-[#0F0F0F] hover:underline">
            Contact Us
          </Link>
          {accessToken ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-[#F28749] font-bold hover:underline"
              >
                <img
                  src="/profileIcon.png"
                  alt="프로필"
                  className="h-8 w-8 rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link
                    to="/mypage"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    마이페이지
                  </Link>
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    로그아웃
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[#F28749] font-bold hover:underline"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
