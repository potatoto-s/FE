import { useNavigate } from 'react-router-dom';

interface MyPageProps {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  workshopName?: string;
}

const MyPage: React.FC<MyPageProps> = ({
  name = '추서령',
  email = 'srchoo19@gmail.com',
  phone = '01049103426',
  companyName = 'JennaCompany',
  workshopName = 'jennachu',
}) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('./MypageEditor');
    console.log('cliked the button of profileEditorPage');
  };
  return (
    <div className="flex flex-col items-center py-10 ">
      <div className="w-full max-w-screen-lg text-center ">
        <h2 className="text-lg font-bold text-[#F28749] inline-block border-b-2 border-[#F28749] pb-3">
          마이페이지
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl mt-16 relative ">
        <div className="flex-shirnk-0 w-40 h-40 rounded-full overflow-hidden md:absolute md:left-10 md:mx-20">
          <img
            src="/profileIcon.png"
            className="w-full h-full object-cover "
            alt="Profile Icon"
          />
        </div>

        <div className=" mt-10 md:mt-0 md:ml-40 text-center md:text-left text-gray-800 md:mr-10">
          <h3 className="text-2xl font-bold">{name}님 안녕하세요!</h3>
          <p className="text-lg mt-4 mb-2">{email}</p>
          <p className="text-lg">{phone}</p>
          <div className="mt-4">
            {companyName && (
              <span className="px-4 py-2 text-sm font-medium text-[#F28749] bg-orange-100 rounded-full border border-[#F28749]">
                {companyName}
              </span>
            )}
            {/* {workshopName && (
              <span className="px-4 py-2 text-sm font-medium text-[#F28749] bg-orange-100 rounded-full border border-[#F28749]">
                {workshopName}
              </span>
            )} */}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center md:text-right w-full max-w-4xl md:pr-16">
        <button
          onClick={handleEditProfile}
          className="px-6 py-2 text-white bg-[#F28749] rounded hover:bg-[#F26749]"
        >
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default MyPage;
