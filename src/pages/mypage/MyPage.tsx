import profileIcon from '../../../public/profileIcon.png';

const MyPage = () => {
  return (
    <div className="flex flex-col items-center py-10 ">
      <div className="w-full max-w-screen-lg text-center ">
        <h2 className="text-lg font-bold text-[#F28749] inline-block border-b-2 border-[#F28749] pb-3">
          마이페이지
        </h2>
      </div>

      <div className="flex items-center justify-center w-full max-w-2xl mt-16 relative">
        <div className="absolute left-10 flex justify-center items-center w-40 h-40 ">
          <img src={profileIcon} className="w-40 h-40 " alt="Profile Icon" />
        </div>

        <div className=" text-gray-800">
          <h3 className="text-2xl font-bold">추서령님 안녕하세요!</h3>
          <p className="text-lg mt-4 mb-2">srchoo19@gmail.com</p>
          <p className="text-lg">010-1234-5678</p>
          <div className="mt-4">
            <span className="px-4 py-2 text-sm font-medium text-[#F28749] bg-orange-100 rounded-full border border-[#F28749]">
              추공방
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 text-right w-full max-w-4xl pr-16">
        <button className="px-6 py-2 text-white bg-[#F28749] rounded hover:bg-[#F26749]">
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default MyPage;
