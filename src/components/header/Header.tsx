import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import useAuthStore from '@stores/authStore';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { accessToken, logout } = useAuthStore();
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await new Promise((resolve) => {
        logout(); // 상태 초기화
        resolve(null);
      });
      alert('로그아웃 되었습니다.');
      navigate('/'); // 메인 페이지로 이동
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
      alert('로그아웃 처리에 실패했습니다.');
    }
  };

  // 드롭다운/햄버거 메뉴 타이머 설정 함수
  const startCloseTimer = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = window.setTimeout(() => {
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
    }, 3000);
    setTimeoutId(id);
  }, [timeoutId]);

  // 드롭다운/햄버거 메뉴 타이머 해제 함수
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
        setIsMenuOpen(false);
        clearCloseTimer();
      }
    };

    if (isDropdownOpen || isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isMenuOpen, clearCloseTimer]);

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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            src="/logo.png"
            alt="로고"
            className="h-[2rem] sm:h-[2.5rem] object-contain"
          />
        </Link>

        {/* 햄버거 버튼 */}
        <button
          className="sm:hidden text-[#F28749] text-[1.5rem]"
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            setIsDropdownOpen(false);
            clearCloseTimer();
            if (!isMenuOpen) startCloseTimer();
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
                <Link
                  to="#"
                  onClick={handleLogout}
                  className="block py-2 px-4 text-[#F28749] font-bold hover:text-[#c36d3b] cursor-pointer"
                >
                  로그아웃
                </Link>
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
                  clearCloseTimer();
                  if (!isDropdownOpen) startCloseTimer();
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
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="block py-2 px-4 text-black hover:text-gray-800 cursor-pointer"
                  >
                    로그아웃
                  </Link>
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
