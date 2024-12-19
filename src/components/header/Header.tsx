import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[100px] bg-white shadow-sm z-10">
      <div className="mx-auto w-[1300px] flex items-center justify-between h-full px-4">
        <Link to="/" className="text-[40px] font-medium text-[#F28749]">
          LOGO
        </Link>
        <div className="flex items-center gap-12 ml-auto">
          <nav className="flex gap-12">
            <Link
              to="/community"
              className="text-[#0F0F0F] text-[16px] font-normal border-b-2 border-transparent hover:border-black"
            >
              Community
            </Link>
            <Link
              to="/contact"
              className="text-[#0F0F0F] text-[16px] font-normal pb-[2px] border-b-2 border-transparent hover:border-black"
            >
              Contact Us
            </Link>
          </nav>
          <Link
            to="/login"
            className="text-[#F28749] text-[16px] font-normal hover:text-[#ff5d00] pb-[2px] border-b-2 border-transparent hover:border-transparent"
          >
            login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
