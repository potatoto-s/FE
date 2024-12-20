import { Link } from 'react-router-dom';
import logo from '/assets/logo.png';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[6.25rem] bg-white z-10">
      <div className="mx-auto w-[81.25rem] flex items-center justify-between h-full px-4">
        <Link to="/" className="text-[2.5rem] font-medium text-[#F28749]">
          <img src={logo} alt="로고" className="h-[2.5rem] w-auto" />
        </Link>
        <div className="flex items-center gap-12 ml-auto">
          <nav className="flex gap-12">
            <Link
              to="/community"
              className="text-[#0F0F0F] text-[1rem] font-normal border-b-2 border-transparent hover:border-black"
            >
              Community
            </Link>
            <Link
              to="/contact"
              className="text-[#0F0F0F] text-[1rem] font-normal pb-[0.125rem] border-b-2 border-transparent hover:border-black"
            >
              Contact Us
            </Link>
          </nav>
          <Link
            to="/login"
            className="text-[#F28749] text-[1rem] font-normal hover:text-[#ff5d00] pb-[0.125rem] border-b-2 border-transparent hover:border-transparent"
          >
            login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
