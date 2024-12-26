import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/assets/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center h-[6.25rem] px-4 sm:px-8 max-w-[81.25rem] mx-auto">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="로고" className="h-[2rem] sm:h-[2.5rem]" />
        </Link>

        <button
          className="sm:hidden text-[#F28749]"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {isOpen && (
          <nav
            className="absolute top-[6.25rem] right-4 bg-white shadow-lg rounded-lg w-[12.5rem] text-center border border-gray-200 z-20"
            onClick={() => setIsOpen(false)}
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
            <Link
              to="/login"
              className="block py-2 px-4 text-[#F28749] font-bold hover:text-[#c36d3b]"
            >
              Login
            </Link>
          </nav>
        )}

        <nav className="hidden sm:flex sm:gap-12 items-center">
          <Link to="/community" className="text-[#0F0F0F] hover:underline ">
            Community
          </Link>
          <Link to="/contact" className="text-[#0F0F0F] hover:underline">
            Contact Us
          </Link>
          <Link
            to="/login"
            className="text-[#F28749] font-bold hover:underline"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
