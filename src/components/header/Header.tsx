import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import useAuthStore from '../../stores/authStore';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 햄버거 메뉴 상태
  const { accessToken, logout } = useAuthStore(); // 로그인 상태와 로그아웃 함수
  const [timeoutId, setTimeoutId] = useState<number | null>(null); // 드롭다운 타이머 설정

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
  };

  // 드롭다운 타이머 설정 함수
  const startCloseTimer = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId); // 기존 타이머 해제
    const id = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 3000); // 3초 후 닫기
    setTimeoutId(id);
  }, [timeoutId]);

  // 드롭다운 타이머 해제 함수
  const clearCloseTimer = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !(
          target.closest('.dropdown-menu') || target.closest('.dropdown-button')
        )
      ) {
        setIsDropdownOpen(false);
        clearCloseTimer();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, clearCloseTimer]);

  // 화면 크기 변경 시 상태 초기화
  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
      clearCloseTimer();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [clearCloseTimer]);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center h-[6.25rem] px-4 sm:px-8 max-w-[81.25rem] mx-auto">
        <Link to="/" className="flex-shrink-0">
          <img
            src="assets/logo.png"
            alt="로고"
            className="h-[2rem] sm:h-[2.5rem]"
          />
        </Link>

        {/* 햄버거 버튼 */}
        <button
          className="sm:hidden text-[#F28749]"
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            setIsDropdownOpen(false); // 햄버거 메뉴 열릴 때 드롭다운 닫기
            clearCloseTimer();
          }}
        >
          ☰
        </button>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <nav className="absolute top-[6.25rem] right-4 bg-white shadow-lg rounded-lg w-[12.5rem] text-center border border-gray-200 z-20 dropdown-menu">
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
          <Link to="/community" className="text-[#0F0F0F] hover:underline">
            Community
          </Link>
          <Link to="/contact" className="text-[#0F0F0F] hover:underline">
            Contact Us
          </Link>
          {accessToken ? (
            <div className="relative">
              <button
                className="dropdown-button text-[#F28749] font-bold hover:underline"
                onClick={() => {
                  setIsDropdownOpen((prev) => !prev);
                  if (!isDropdownOpen) startCloseTimer(); // 열릴 때 타이머 시작
                  clearCloseTimer(); // 타이머 초기화
                }}
              >
                <CgProfile className="h-8 w-8 text-[#F28749]" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 text-center dropdown-menu">
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
